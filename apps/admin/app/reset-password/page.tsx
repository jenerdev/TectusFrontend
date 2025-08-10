// "use client";
// import { UiButton, UiTextField, useUiSnackbar } from '@tectus/ui';
// import { PageBanner } from '../components';
// import { useBEM, useForm } from '@tectus/hooks';
// import './reset-password-page.scss';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useCallback, useMemo } from 'react';
// import { useApi } from '../hooks';
// import { RepeatPasswordValues, ResetPasswordPayload } from './reset-password.types';
// import { ApiErrorCode, apiErrorMessageMapping } from '../constants';



// export default function ResetPasswordPage() {
//   const { B, E } = useBEM('reset-password-page');
//   const router = useRouter();
//   const { showSnackbar } = useUiSnackbar();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email"); // e.g., /products?id=123 → "123"
//   const code = searchParams.get("code");
  
//   const { loading, sendRequest } = useApi<any, ResetPasswordPayload>(
//     `user/confirmPasswordReset`,
//     {
//       method: 'POST',
//     },
//   );

//   const {
//     values,
//     register,
//     handleSubmit,
//     validate: { required, minLength },
//     errors,
//   } = useForm<RepeatPasswordValues>({
//     password: '',
//     repeatPassword: '',
//   });

//   // Check if both fields are filled
//   const bothFilled = useMemo(() => {
//     return Boolean(values.password) && Boolean(values.repeatPassword);
//   }, [values.password, values.repeatPassword]);

//   // Check if passwords match
//   const passwordsMatch = useMemo(() => {
//     return values.password === values.repeatPassword;
//   }, [values.password, values.repeatPassword]);

//   // Final error message for repeat password
//   const repeatPasswordErrorMessage = useMemo(() => {
//     if (errors.repeatPassword) return errors.repeatPassword;
//     if (bothFilled && !passwordsMatch) return 'Passwords do not match';
//     return '';
//   }, [errors.repeatPassword, bothFilled, passwordsMatch]);

//   const handleOnSubmit = useCallback(async ({ password }: RepeatPasswordValues) => {
//     if(!passwordsMatch)return;

//     const result = await sendRequest({
//       body: { 
//         newPassword: password,
//         email,
//         oobCode: code
//       },
//     });

//     if (result.error) {
//       const message = apiErrorMessageMapping[result.error.message as ApiErrorCode] || apiErrorMessageMapping.GENERIC;
//       showSnackbar(message, 'error', {
//         anchorOrigin: {
//           vertical: 'top',
//           horizontal: 'center',
//         }
//       });
//       return;
//     }

//     showSnackbar('Password successfully updated.', 'success', {
//       anchorOrigin: {
//         vertical: 'top',
//         horizontal: 'center',
//       },
//       onClose: () => router.push('/signin'),
//     });

//   }, [sendRequest, email, code, showSnackbar, router, passwordsMatch]);

//   return (
//     <div className={B()}>
//       <PageBanner
//         title="Reset password"
//         subtitle="Please enter your new password."
//       />

//       <form className={E('form')} onSubmit={handleSubmit(handleOnSubmit)}>
//         <UiTextField
//           {...register('password', {
//             ...required('Password is required'),
//             ...minLength(8, 'Password must be at least 8 characters long'),
//           })}
//           helperText={errors.password}
//           error={Boolean(errors.password)}
//           type="password"
//           placeholder="Password"
//         />
//         <UiTextField
//           {...register('repeatPassword', {
//             ...required('Repeat Password is required'),
//             ...minLength(
//               8,
//               'Repeat Password must be at least 8 characters long'
//             ),
//           })}
//           helperText={repeatPasswordErrorMessage}
//           error={Boolean(errors.repeatPassword) || (bothFilled && !passwordsMatch)}
//           type="password"
//           placeholder="Repeat Password"
//         />

//         <UiButton type='submit' topspacing={4} loading={loading}>Set password</UiButton>
//       </form>
//     </div>
//   );
// }

"use client";

import { Suspense, useCallback, useMemo } from "react";
import { UiButton, UiTextField, useUiSnackbar } from "@tectus/ui";
import { PageBanner } from "../components";
import { useBEM, useForm } from "@tectus/hooks";
import "./reset-password-page.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useApi } from "../hooks";
import { RepeatPasswordValues, ResetPasswordPayload } from "./reset-password.types";
import { ApiErrorCode, apiErrorMessageMapping } from "../constants";

// Isolated component that uses useSearchParams()
function ResetPasswordForm() {
  const { B, E } = useBEM("reset-password-page");
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const { loading, sendRequest } = useApi<any, ResetPasswordPayload>(
    `user/confirmPasswordReset`,
    {
      method: "POST",
    }
  );

  const {
    values,
    register,
    handleSubmit,
    validate: { required, minLength },
    errors,
  } = useForm<RepeatPasswordValues>({
    password: "",
    repeatPassword: "",
  });

  const bothFilled = useMemo(
    () => Boolean(values.password) && Boolean(values.repeatPassword),
    [values.password, values.repeatPassword]
  );

  const passwordsMatch = useMemo(
    () => values.password === values.repeatPassword,
    [values.password, values.repeatPassword]
  );

  const repeatPasswordErrorMessage = useMemo(() => {
    if (errors.repeatPassword) return errors.repeatPassword;
    if (bothFilled && !passwordsMatch) return "Passwords do not match";
    return "";
  }, [errors.repeatPassword, bothFilled, passwordsMatch]);

  const handleOnSubmit = useCallback(
    async ({ password }: RepeatPasswordValues) => {
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
            vertical: "top",
            horizontal: "center",
          },
        });
        return;
      }

      showSnackbar("Password successfully updated.", "success", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        onClose: () => router.push("/signin"),
      });
    },
    [sendRequest, email, code, showSnackbar, router, passwordsMatch]
  );

  return (
    <form className={E("form")} onSubmit={handleSubmit(handleOnSubmit)}>
      <UiTextField
        {...register("password", {
          ...required("Password is required"),
          ...minLength(8, "Password must be at least 8 characters long"),
        })}
        helperText={errors.password}
        error={Boolean(errors.password)}
        type="password"
        placeholder="Password"
      />
      <UiTextField
        {...register("repeatPassword", {
          ...required("Repeat Password is required"),
          ...minLength(
            8,
            "Repeat Password must be at least 8 characters long"
          ),
        })}
        helperText={repeatPasswordErrorMessage}
        error={
          Boolean(errors.repeatPassword) ||
          (bothFilled && !passwordsMatch)
        }
        type="password"
        placeholder="Repeat Password"
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
        title="Reset password"
        subtitle="Please enter your new password."
      />

      {/* Suspense boundary only around the part that uses searchParams */}
      <Suspense fallback={<div>Loading reset form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
