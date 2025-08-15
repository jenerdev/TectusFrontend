'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/store';

export function useProtectedRoute() {
  const token = useUserStore((state) => state.token);
  const emailVerified = useUserStore((state) => state.user?.emailVerified);
  const status = useUserStore((state) => state.user?.status);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!token) {
      router.replace('/');
      return;
    }
    const statusRedirects: Record<string, string> = {
      Rejected: '/application-rejected',
      Pending: '/application-submitted',
      Approved: '/dashboard',
    };

    let route = '';
    if (token && !emailVerified) {
      route = '/verify-email';
    } else {
      route = statusRedirects[status as string] || '';
    }

    if (
      status === 'Approved' &&
      (pathname === '/application-submitted' || pathname === '/application-approved')
    )
      return;
    if (route && pathname !== route) {
      router.replace(route);
    }
  }, [hasHydrated, token, status, emailVerified]);

  return {
    hasHydrated,
  };
}
