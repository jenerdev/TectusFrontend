'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { UserStatus, useUserStore } from '@/store';

export function useProtectedRoute() {
  const token = useUserStore((state) => state.token);
  const emailVerified = useUserStore((state) => state.user?.emailVerified);
  const status = useUserStore((state) => (state.user?.status || '').toUpperCase() as UserStatus);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  const router = useRouter();
  const pathname = usePathname();

  // Track if the effect has already run
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (hasRunOnce.current) return; // Prevent running again
    if (!hasHydrated) return;

    hasRunOnce.current = true; // Mark as executed

    if (!token) {
      router.replace('/');
      return;
    }
    const statusRedirects: Record<UserStatus, string> = {
      [UserStatus.REJECTED]: '/application-rejected',
      [UserStatus.PENDING]: '/application-submitted',
      [UserStatus.APPROVED]: '/dashboard',
    };

    let route = '';
    if (token && !emailVerified) {
      route = '/verify-email';
    } else {
      route = status ? statusRedirects[status] || '' : '';
    }

    if (status === UserStatus.APPROVED && pathname === '/application-approved') return;
    if (route && pathname !== route) {
      router.replace(route);
    }
  }, [hasHydrated, token, status, emailVerified, pathname, router]);

  return {
    hasHydrated,
  };
}
