'use client';
import { useBEM } from '@tectus/hooks';
import './Header.scss';
import { Container } from '../Container';
import Image from 'next/image';
import UiIcon from '@tectus/ui/UiIcon/UiIcon';
import UiMenu from '@tectus/ui/UiMenu/UiMenu';
import { useUserStore } from '@/store';
import { useRouter } from 'next/navigation';
import { AppLink, UiTypography } from '@tectus/ui';

interface HeaderProps {
  center?: boolean;
  noMenu?: boolean;
}

export function Header({ center=false, noMenu=false }: HeaderProps) {
  const { B, E } = useBEM('header');
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const onLogout = () => {
    useUserStore.getState().logout();
    router.push('/');
  };

  const gotoProfile = () => {
    router.push(`/profile`);
  };

  return (
    <div className={B()}>
      <Container className={E('container', center ? 'center' : '')}>
        <div className={E('brand')}>
          <AppLink href="/dashboard">
            <Image src="/logo-tectus-go.png" alt="Logo" width={80} height={80} className={E('logo')} />
          </AppLink>
          <UiTypography variant='h5' className={E('brand-name')} fontWeight={700}>
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
