import { useQuery } from '@tanstack/react-query';
import { Globe, Utensils, Vegan } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import NotFoundPage from '@/pages/404.page';

import { ApiResponse } from '@/types/api';
import { RecipeTypes } from '@/types/entity/recipes';
import { User } from '@/types/entity/user';

export default function DetailRecipe() {
  const router = useRouter();
  const { id } = router.query;

  const { data: queryData } = useQuery<ApiResponse<RecipeTypes>>([
    `/recipes/${id}`,
  ]);
  const recipe = queryData?.data;

  const { data: queryData2 } = useQuery<ApiResponse<User>>([`/users/${id}`]);
  const user = queryData2?.data;

  if (!recipe) {
    return <NotFoundPage />;
  }

  return (
    <Layout withHeader={true}>
      <Seo templateTitle={recipe.name} />
      <main className='mx-auto flex w-11/12 flex-col gap-12 py-16 md:w-10/12'>
        <section className='flex flex-col gap-4 bg-white'>
          <Typography variant='h1'>{recipe.name}</Typography>
          <NextImage
            src={recipe.thumbnail}
            alt={recipe.name}
            width={400}
            height={500}
            className='mx-auto my-4 max-w-sm rounded-lg shadow'
          />
          <Typography variant='s2'>
            by <span className='font-bold'>{user?.name || 'Anonymous'}</span>
          </Typography>
          <div className='flex flex-col items-center justify-around gap-4 lg:flex-row'>
            <div className='flex flex-row items-center gap-1'>
              <Utensils size={24} />
              <Typography variant='b3'>{recipe.category}</Typography>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <Vegan size={24} />
              <Typography variant='b3'>
                {recipe.vegan ? 'Vegan' : 'Non-Vegan'}
              </Typography>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <Globe size={24} />
              <Typography variant='b3'>{recipe.origin}</Typography>
            </div>
          </div>
          <Typography variant='h2'>Ingredients</Typography>
          <ul className='mb-4 list-inside list-disc'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className='mb-2'>
                {recipe.measures[index] + ' ' + ingredient}
              </li>
            ))}
          </ul>
          <Typography variant='h2'>Steps</Typography>
          <ol className='mb-4 list-inside list-decimal'>
            {recipe.steps.map((step, index) => (
              <li key={index} className='mb-2'>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </main>
    </Layout>
  );
}
