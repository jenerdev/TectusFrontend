"use client";

import { Suspense, useCallback, useMemo } from "react";
import { UiButton, UiTextField, useUiSnackbar } from "@tectus/ui";
import { useBEM, useForm } from "@tectus/hooks";
import "./reset-password-page.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfirmPasswordValues, ResetPasswordPayload } from "./reset-password.types";
import { useApi } from "@/app/hooks";
import { PageBanner, useSignInForm } from "@/app/components";
import { AuthRoleEnum } from "@/app/api/models";

const contentMapping = {
  personnel: {
    title: 'Sign up for Tectus GO',
    subTitle: '',
    submitButtonText: 'Sign Up',
    nextPageUrl: '',
  },
  vendor: {
    title: 'Set new password',
    subTitle: 'Please enter your new password',
    submitButtonText: 'Set New password',
    nextPageUrl: '/signin',
  }
}

// Isolated component that uses useSearchParams()
function ResetPasswordForm({ role }: { role?: string }) {
  const { B, E } = useBEM("reset-password-page");
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const isPersonnel = role === AuthRoleEnum.PERSONNEL;
  const content = contentMapping[isPersonnel ? 'personnel' : 'vendor'];

  const { handleSignIn, loading: signInLoading } = useSignInForm();
  // TODO: create a model and hook for this on /api
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
    reset
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
        showSnackbar(result.error.message, "error");
        return;
      }
      reset();
      showSnackbar("Password successfully updated.", "success", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        onClose: () => {
          if(content.nextPageUrl) router.push(content.nextPageUrl)
        },
      });
      
      // Auto login for personnel after password reset
      // and redirected to create profile page
      if(isPersonnel && email) {
        handleSignIn({ email, password }, false);
      }
    },
    [sendRequest, email, code, showSnackbar, router, passwordsMatch]
  );

  return (
    <form className={E("form")} onSubmit={handleSubmit(handleOnSubmit)}>
      {
        isPersonnel && (
          <UiTextField
            label="Email"
            placeholder="Email"  
            value={email || ""}
            disabled
          />
        )
      }
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

      <UiButton type="submit" topspacing={4} loading={loading || signInLoading}>
        {content.submitButtonText}
      </UiButton>
    </form>
  );
}

export default function ResetPasswordPage() {
  const { B } = useBEM("reset-password-page");
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || undefined;
  const isPersonnel = role === "personnel";
  const content = contentMapping[isPersonnel ? 'personnel' : 'vendor'];

  return (
    <div className={B()}>
      <PageBanner
        title={content.title}
        subtitle={content.subTitle}
      />

      {/* Suspense boundary only around the part that uses searchParams */}
      <Suspense fallback={<div>Loading reset form...</div>}>
        <ResetPasswordForm role={role} />
      </Suspense>
    </div>
  );
}
