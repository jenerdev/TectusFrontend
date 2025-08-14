import { UiTypography } from "@tectus/ui";
import "./loading-page.scss";

export default function LoadingPage() {
  return (
    <main className="loading-page">
      <div className="loading-page__spinner"></div>

      <UiTypography className="loading-page__text" variant="body1">
        Loading...
      </UiTypography>
    </main>
  );
}
