import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import RecipeCard from '@/components/cards/RecipeCard';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import CreateRecipesModal from '@/pages/dashboard/recipes/container/CreateRecipesModal';

import { ApiResponse } from '@/types/api';
import { RecipeTypes } from '@/types/entity/recipes';

export default withAuth(DashboardRecipes, 'user');
function DashboardRecipes() {
  const { data: queryData } = useQuery<ApiResponse<RecipeTypes[]>>([
    `/recipes/me`,
  ]);
  const recipes = queryData?.data;

  return (
    <Layout withHeader={true}>
      <Seo templateTitle='My Recipes' />

      <main className='mx-auto flex w-11/12 flex-col gap-12 py-16 md:w-10/12'>
        <section className='flex flex-col gap-4 bg-white'>
          <div className='flex flex-col justify-center lg:flex-row lg:justify-between'>
            <Typography variant='j2'>My Recipes</Typography>
            <CreateRecipesModal>
              {({ openModal }) => (
                <Button onClick={openModal} leftIcon={Plus}>
                  Add Recipe
                </Button>
              )}
            </CreateRecipesModal>
          </div>
          {recipes?.length === 0 ? (
            <Typography variant='b2'>No recipes found</Typography>
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {recipes?.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  href={`/dashboard/recipes/${recipe.id}`}
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
