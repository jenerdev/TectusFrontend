export type PageKey =
  | 'individual-signup'
  | 'verify-email'
  | 'reset-password'
  | 'application-submitted'
  | 'application-rejected'
  | 'application-approved';

export interface PageContent {
  title: string;
  subtitle: string;
  button: {
    text: string;
    link?: string;
    action?: () => void;
  };
}

export interface ActionPageProps {
  params: Promise<{ action: PageKey }>;
}
