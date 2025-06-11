import { useRouter } from 'next/router';
import * as React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';

import useAuthStore from '@/store/useAuthStore';

export default function Header() {
  const router = useRouter();

  const isAuthenticated = useAuthStore.useIsAuthenticated();
  const isLoading = useAuthStore.useIsLoading();
  const logout = useAuthStore.useLogout();

  const isInDashboard = router.pathname.startsWith('/dashboard');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-16 items-center justify-between'>
        <UnstyledLink
          href='/'
          className='font-bold text-primary-500 hover:text-primary-600'
        >
          Buku Resep
        </UnstyledLink>

        <nav>
          <ul className='flex items-center space-x-3'>
            {!isLoading && isAuthenticated && (
              <>
                {!isInDashboard && (
                  <li>
                    <ButtonLink href='/dashboard/recipes' variant='primary'>
                      See My Recipe
                    </ButtonLink>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className='rounded-md border-2 border-red-500 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition'
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <>
                <li>
                  <ButtonLink
                    href='/auth/login'
                    variant='ghost'
                    className='border-2 border-primary-500'
                  >
                    Login
                  </ButtonLink>
                </li>
                <li>
                  <ButtonLink href='/auth/register' variant='primary'>
                    Register
                  </ButtonLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
