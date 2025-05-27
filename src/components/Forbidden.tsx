import * as React from 'react';

import Typography from '@/components/typography/Typography';

export default function Forbidden() {
  return (
    <main>
      <section className='bg-background-cream'>
        <div className='layout text-primary-yellow flex min-h-screen flex-col items-center justify-center text-center'>
          <Typography
            variant='h4'
            className='text-danger-500 mt-4 text-4xl font-bold md:text-6xl'
          >
            Forbidden 403 <br />
            You are not allowed on this page
          </Typography>
        </div>
      </section>
    </main>
  );
}
