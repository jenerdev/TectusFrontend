'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { UserStatus, useUserStore } from '@/store';

interface useProtectedRouteProps {
  bypassApproved?: boolean; // Note as long as the user is approved, they will be stay on current route
}

export function useProtectedRoute(props?: useProtectedRouteProps) {
  const { bypassApproved = false } = props || {};

  const token = useUserStore((state) => state.token);
  const emailVerified = useUserStore((state) => state.user?.emailVerified);
  const status = useUserStore((state) => (state.user?.status || '').toUpperCase() as UserStatus);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  const router = useRouter();
  const pathname = usePathname();
  const [decided, setDecided] = useState(false);

  // Track if the effect has already run
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (hasRunOnce.current) return;
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
      route = statusRedirects[status] ?? '/submit-info';
    }

    if (
      status === UserStatus.APPROVED &&
      (pathname === '/application-approved' || bypassApproved)
    ) {
      setDecided(true);
      return;
    }
    if (route && pathname !== route) {
      router.replace(route);
    } else {
      setDecided(true);
    }
  }, [hasHydrated, token, status, emailVerified, pathname, router, setDecided]);

  return {
    isChecking: !hasHydrated || !decided,
  };
}
