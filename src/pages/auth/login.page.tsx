import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import withAuth from '@/components/hoc/withAuth';
import PrimaryLink from '@/components/links/PrimaryLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';
import { User } from '@/types/entity/user';

type LoginFormData = {
  email: string;
  password: string;
};

export default withAuth(LoginPage, 'public');
function LoginPage() {
  const router = useRouter();
  const login = useAuthStore.useLogin();
  const methods = useForm({
    mode: 'onTouched',
  });

  const { handleSubmit } = methods;

  const { mutate: handleLogin, isLoading } = useMutationToast<
    void,
    LoginFormData
  >(
    useMutation(async (data) => {
      const res = await api.post('/auth/login', data);
      const { accessToken } = res.data.data;
      localStorage.setItem('token', accessToken);

      const user = await api.get<ApiResponse<User>>('/auth/me');

      if (!user.data.data) {
        throw new Error('Sesi login tidak valid');
      }
      login({ ...user.data.data, accessToken });
      router.push('/dashboard');
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data as LoginFormData);
  };

  return (
    <main className='flex h-screen w-full flex-row items-center justify-center'>
      <Seo templateTitle='Login' />
      <section className='hidden h-full w-1/2 overflow-hidden lg:block'>
        <NextImage
          src='/images/auth/login.png'
          alt='Login'
          width={720}
          height={1024}
          className='h-full'
        />
      </section>
      <section className='mx-auto w-10/12 lg:w-1/2'>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex w-3/4 flex-col gap-6'
          >
            <Typography variant='j1'>Sign in</Typography>
            <Typography variant='b1'>
              Savor the flavors! Log in to your account and let the culinary
              journey begin.
            </Typography>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-3'>
                <Input
                  id='email'
                  label='Email'
                  validation={{ required: 'Email must be filled' }}
                  placeholder='Enter your email'
                  required
                />
                <Input
                  id='password'
                  label='Password'
                  validation={{ required: 'Password must be filled' }}
                  placeholder='Enter your password'
                  type='password'
                  required
                />
              </div>
              <Button
                size='lg'
                variant='primary'
                type='submit'
                isLoading={isLoading}
              >
                Login
              </Button>
            </div>
            <Typography variant='b1'>
              New to Buku Resep Join the community and create your account{' '}
              <PrimaryLink href='/auth/register'>here</PrimaryLink>
            </Typography>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}
