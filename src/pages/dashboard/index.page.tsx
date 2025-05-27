import { useRouter } from 'next/router';
import React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Loading from '@/components/Loading';

const DashboardPage = () => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push('/dashboard/recipes');
  }

  return <Loading />;
};

export default withAuth(DashboardPage, 'user');
