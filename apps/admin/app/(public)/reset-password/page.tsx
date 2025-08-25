"use client";

import { Suspense, useCallback, useMemo } from "react";
import { UiButton, UiTextField, useUiSnackbar } from "@tectus/ui";
import { useBEM, useForm } from "@tectus/hooks";
import "./reset-password-page.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfirmPasswordValues, ResetPasswordPayload } from "./reset-password.types";
import { ApiErrorCode, apiErrorMessageMapping } from "@/app/constants";
import { useApi } from "@/app/hooks";
import { PageBanner } from "@/app/components";

// Isolated component that uses useSearchParams()
function ResetPasswordForm() {
  const { B, E } = useBEM("reset-password-page");
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const { loading, sendRequest } = useApi<any, ResetPasswordPayload>(
    `api/go/user/confirmPasswordReset`,
    {
      method: "POST",
    }
  );

  const {
    values,
    register,
    handleSubmit,
    validate: { required, minLength, password },
    errors,
  } = useForm<ConfirmPasswordValues>({
    password: "",
    confirmPassword: "",
  });

  const bothFilled = useMemo(
    () => Boolean(values.password) && Boolean(values.confirmPassword),
    [values.password, values.confirmPassword]
  );

  const passwordsMatch = useMemo(
    () => values.password === values.confirmPassword,
    [values.password, values.confirmPassword]
  );

  const repeatPasswordErrorMessage = useMemo(() => {
    if (errors.confirmPassword) return errors.confirmPassword;
    if (bothFilled && !passwordsMatch) return "Passwords do not match";
    return "";
  }, [errors.confirmPassword, bothFilled, passwordsMatch]);

  const handleOnSubmit = useCallback(
    async ({ password }: ConfirmPasswordValues) => {
      if (!passwordsMatch) return;

      const result = await sendRequest({
        body: {
          newPassword: password,
          email,
          oobCode: code,
        },
      });

      if (result.error) {
        const message =
          apiErrorMessageMapping[result.error.message as ApiErrorCode] ||
          apiErrorMessageMapping.GENERIC;
        showSnackbar(message, "error", {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
        return;
      }

      showSnackbar("Password successfully updated.", "success", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        onClose: () => router.push("/signin"),
      });
    },
    [sendRequest, email, code, showSnackbar, router, passwordsMatch]
  );

  return (
    <form className={E("form")} onSubmit={handleSubmit(handleOnSubmit)}>
      <UiTextField
        label="Password"
        placeholder="Password"
        {...register("password", {
          ...required("Password is required"),
          ...minLength(12, "Password must be at least 12 characters"),
          ...password(),
        })}
        helperText={errors.password}
        error={Boolean(errors.password)}
        type="password"
      />
      <UiTextField
        label="Confirm password"
        placeholder="Confirm password"
        {...register("confirmPassword", {
          ...required("Confirm password is required"),
          ...minLength(
            12,
            "Password must be at least 12 characters"
          ),
          ...password(),
        })}
        helperText={repeatPasswordErrorMessage}
        error={
          Boolean(errors.confirmPassword) ||
          (bothFilled && !passwordsMatch)
        }
        type="password"
      />

      <UiButton type="submit" topspacing={4} loading={loading}>
        Set password
      </UiButton>
    </form>
  );
}

export default function ResetPasswordPage() {
  const { B } = useBEM("reset-password-page");

  return (
    <div className={B()}>
      <PageBanner
        title="Set new password"
        subtitle="Please enter your new password."
      />

      {/* Suspense boundary only around the part that uses searchParams */}
      <Suspense fallback={<div>Loading reset form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
