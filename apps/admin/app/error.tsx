"use client";

import { useEffect } from "react";
import "./error.scss";
import { useBEM } from "@tectus/hooks";
import { UiButton, UiTypography } from "@tectus/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  const {B, E} = useBEM('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
    <div className={B()}>
      <UiTypography variant="h3" className={E('title')}>Oops! Something went wrong.</UiTypography>
      <UiTypography className={E('message')}>
        An unexpected error occurred. Please try again.
      </UiTypography>
      <UiButton className={E('button')} onClick={() => reset()}>
        Retry
      </UiButton>
    </div> 
  );
}
