
import { useBEM } from '@tectus/hooks'; 
import './action-page.scss';
import { PageBanner } from '@/app/components';
import { notFound } from 'next/navigation';
import { ActionPageProps } from './types';
import { actionPagesData } from './pages.data';
import { AlertButton } from './components/AlertButton/AlertButton';

export default async function ActionPage({ params }: ActionPageProps) {
  const { B } = useBEM('action-page');
  const { action } = await params;
  if (!action) return notFound();
  const pageData = actionPagesData[action];
  if (!pageData) return notFound();

  return (
    <div className={B()}>
      <PageBanner
        title={pageData.title}
        subtitle={pageData.subtitle}
      />

      <AlertButton label={pageData.button.text} navigateTo={pageData.button?.link} />
    </div>
  );
}
