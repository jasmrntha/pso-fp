import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import RecipeCard from '@/components/cards/RecipeCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { RecipeTypes } from '@/types/entity/recipes';

export default function HomePage() {
  const { data: queryData } = useQuery<ApiResponse<RecipeTypes[]>>([
    `/recipes`,
  ]);
  const recipes = queryData?.data;

  return (
    <Layout withHeader={true}>
      <Seo templateTitle='Home' />

      <main className='mx-auto flex w-11/12 flex-col gap-12 py-16 md:w-10/12'>
        <section className='flex flex-col gap-4 bg-white'>
          <Typography variant='j2'>Trending Recipes</Typography>
          {recipes?.length === 0 ? (
            <Typography variant='b2'>No recipes found</Typography>
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {recipes?.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  href={`/recipe/${recipe.id}`}
                  recipe={recipe}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
