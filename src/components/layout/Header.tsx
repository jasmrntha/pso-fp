import * as React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';

export default function Header() {
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
          <ul className='flex items-center justify-between space-x-4'>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
