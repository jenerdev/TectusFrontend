'use client';
import { useBEM } from '@tectus/hooks';
import './Header.scss';
import { Container } from '../Container';
import Image from 'next/image';
import UiIcon from '@tectus/ui/UiIcon/UiIcon';
import UiMenu from '@tectus/ui/UiMenu/UiMenu';
import { useUserStore } from '@/store';
import { useRouter } from 'next/navigation';
import { AppLink } from '@tectus/ui';

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const { B, E } = useBEM('header');
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const onLogout = () => {
    useUserStore.getState().logout();
    router.push('/');
  };

  const gotoProfile = () => {
    router.push(`/profile`);
  }

  return (
    <div className={B()}>
      <Container className={E('container')}>

        <AppLink href='/dashboard'>
          <Image src="/logo-tectus.png" alt="Logo" width={80} height={80} className={E('logo')}/>
        </AppLink>

        <UiMenu
          items={[
            {
              icon: <UiIcon name="AccountCircle" size='large' />,
              type: 'icon',
              subMenuItems: [
                { 
                  label: user?.email || '',
                  icon: <UiIcon name="Email" size='small' />,
                },
                {
                  label: 'Profile',
                  icon: <UiIcon name="AccountBox" size='small' />,
                  onClick: gotoProfile
                },
                { divider: true, label: '' },
                { label: 'Logout', icon: <UiIcon name="Logout" size='small' />, onClick: onLogout },
              ],
            },
          ]}
        />
      </Container>
    </div>
  );
}
