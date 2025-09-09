'use client';
import { useBEM } from '@tectus/hooks';
import './Header.scss';
import { Container } from '../Container';
import Image from 'next/image'; 
import { UserStatus, useUserStore } from '@/store';
import { useRouter } from 'next/navigation';
import { AppLink, UiTypography, UiIcon, UiMenu } from '@tectus/ui';
import { useMemo } from 'react';

interface HeaderProps {
  center?: boolean;
  noMenu?: boolean;
}

export function Header({ center = false, noMenu = false }: HeaderProps) {
  const { B, E } = useBEM('header');
  const user = useUserStore((state) => state.user);
  const userStatus = useUserStore.getState().getUserStatus();
  const router = useRouter();
  const logoRedirectMapping = {
    [UserStatus.PENDING]: '/application-submitted',
    [UserStatus.APPROVED]: '/dashboard',
    [UserStatus.REJECTED]: '#',
  };

  const onLogout = () => {
    useUserStore.getState().logout();
    router.push('/');
  };

  const gotoProfile = () => {
    router.push(`/profile`);
  };

  const logoRedirect = useMemo(() => {
    return logoRedirectMapping[userStatus || UserStatus.PENDING];
  }, [userStatus]);

  return (
    <div className={B()}>
      <Container className={E('container', center ? 'center' : '')}>
        <div className={E('brand')}>
          <AppLink href={logoRedirect}>
            <Image
              src="/logo-tectus-go.png"
              alt="Logo"
              width={80}
              height={80}
              className={E('logo')}
            />
          </AppLink>
          <UiTypography variant="h5" className={E('brand-name')} fontWeight={700}>
            <span>T</span>
            <span>E</span>
            <span>C</span>
            <span>T</span>
            <span>U</span>
            <span>S</span>
            <span> </span>
            <span>G</span>
            <span>O</span>
          </UiTypography>
        </div>

        {!noMenu && user && (
          <UiMenu
            items={[
              {
                icon: <UiIcon name="AccountCircle" size="large" />,
                type: 'icon',
                subMenuItems: [
                  {
                    label: user?.email || '',
                    icon: <UiIcon name="Email" size="small" />,
                  },
                  {
                    label: 'Profile',
                    icon: <UiIcon name="AccountBox" size="small" />,
                    onClick: gotoProfile,
                  },
                  { divider: true, label: '' },
                  {
                    label: 'Logout',
                    icon: <UiIcon name="Logout" size="small" />,
                    onClick: onLogout,
                  },
                ],
              },
            ]}
          />
        )}
      </Container>
    </div>
  );
}
