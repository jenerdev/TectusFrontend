'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store';

export function useProtectedRoute() {
  const token = useUserStore((state) => state.token);
  const emailVerified = useUserStore((state) => state.emailVerified);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!token) router.replace('/');
    if (token && !emailVerified) router.replace('/verify-email');
  }, [hasHydrated, token, emailVerified]);
}
