import { useMutation, useQuery } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
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
import Radio from '@/components/forms/Radio';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import NotFoundPage from '@/pages/404.page';
import {
  Category,
  Origin,
} from '@/pages/dashboard/recipes/container/CreateRecipesModal';
import DeleteRecipeModal from '@/pages/dashboard/recipes/container/DeleteRecipesModal';

import { ApiResponse } from '@/types/api';
import { RecipeTypes } from '@/types/entity/recipes';

export default withAuth(DashboardDetailRecipes, 'user');
function DashboardDetailRecipes() {
  const router = useRouter();
  const { id } = router.query;

  const { data: queryData } = useQuery<ApiResponse<RecipeTypes>>([
    `/recipes/${id}`,
  ]);
  const recipe = queryData?.data;

  const methods = useForm({
    mode: 'onTouched',
  });

  const { handleSubmit } = methods;

  const [isEdit, setIsEdit] = React.useState(false);

  const { mutate: handleEdit, isLoading } = useMutationToast<void, RecipeTypes>(
    useMutation(
      async (data) => {
        await api.put(`/recipes/update/${id}`, data);
      },
      {
        onSuccess: () => {
          router.reload();
        },
      }
    )
  );

  if (!recipe) {
    return <NotFoundPage />;
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const typedData = data as unknown as RecipeTypes;

    const parsedData: RecipeTypes = {
      ...typedData,
      cookTime: Number(typedData.cookTime),
      vegan: data.vegan === 'true',
    };

    handleEdit(parsedData);
  };

  return (
    <Layout withHeader={true}>
      <Seo templateTitle={`Detail Recipes ${recipe.name}`} />
      <main className='mx-auto flex w-11/12 flex-col gap-12 py-16 md:w-10/12'>
        <section className='flex flex-col gap-4 bg-white'>
          <div className='flex flex-row items-center justify-between'>
            <Typography variant='h1'>{recipe.name}</Typography>
            <div className='flex flex-row gap-2 items-center justify-between'>
              {!isEdit ? (
                <>
                  <DeleteRecipeModal recipeId={id}>
                    {({ openModal }) => (
                      <Button
                        variant='danger'
                        size='sm'
                        leftIcon={Trash}
                        onClick={openModal}
                      >
                        Delete
                      </Button>
                    )}
                  </DeleteRecipeModal>

                  <Button
                    variant='outline'
                    color='blue'
                    size='sm'
                    leftIcon={Pencil}
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    Edit
                  </Button>
                </>
              ) : null}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            {/* Thumbnail Preview */}
            <div className='flex items-start justify-center'>
              <NextImage
                src={recipe.thumbnail}
                alt='food'
                width={300}
                height={300}
                className='w-full'
                imgClassName='w-full h-full object-cover rounded-t-md'
              />
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-3 mt-3'>
                  <Typography variant='h3'>Recipe Details</Typography>
                  <Input
                    id='name'
                    label='Name'
                    validation={{ required: 'Field must be filled' }}
                    placeholder='Enter your recipe name'
                    required
                    defaultValue={recipe.name}
                    readOnly={!isEdit}
                  />
                  <Input
                    id='description'
                    label='Description'
                    validation={{ required: 'Field must be filled' }}
                    placeholder='Enter your recipe description'
                    required
                    defaultValue={recipe.description}
                    readOnly={!isEdit}
                  />
                  {!isEdit ? (
                    <Input
                      id='category'
                      label='Category'
                      validation={{ required: 'Field must be filled' }}
                      placeholder='Enter your recipe description'
                      required
                      defaultValue={recipe.category}
                      readOnly={true}
                    />
                  ) : (
                    <SearchableSelectInput
                      id='category'
                      label='Category'
                      placeholder='Select something'
                      options={Category.map((category) => ({
                        label: category,
                        value: category,
                      }))}
                      validation={{ required: 'Category must be filled' }}
                      required
                    />
                  )}
                  <div className='space-y-2'>
                    <Typography variant='s2'>
                      Is Vegan? <span className='text-red-500'>*</span>
                    </Typography>
                    <div className='flex flex-row gap-4'>
                      <Radio
                        name='vegan'
                        label='Yes'
                        value='yes'
                        defaultChecked={recipe.vegan}
                        hideError
                      />
                      <Radio
                        name='vegan'
                        label='No'
                        value='no'
                        defaultChecked={!recipe.vegan}
                        validation={{ required: 'Is Vegan must be filled' }}
                      />
                    </div>
                  </div>
                  <Input
                    id='cookTime'
                    label='Cook Time'
                    validation={{ required: 'Field must be filled' }}
                    placeholder='Enter your recipe cook time'
                    defaultValue={recipe.cookTime}
                    required
                    readOnly={!isEdit}
                  />
                  <Input
                    id='thumbnail'
                    label='Thumbnail'
                    validation={{ required: 'Field must be filled' }}
                    placeholder='Enter your recipe thumbnail'
                    required
                    readOnly={!isEdit}
                    defaultValue={recipe.thumbnail}
                  />
                  {!isEdit ? (
                    <Input
                      id='origin'
                      label='Origin'
                      validation={{ required: 'Field must be filled' }}
                      placeholder='Enter your recipe origin'
                      required
                      defaultValue={recipe.origin}
                      readOnly={true}
                    />
                  ) : (
                    <SearchableSelectInput
                      id='origin'
                      label='Origin'
                      placeholder='Select something'
                      defaultValue={recipe.origin}
                      options={Origin.map((origin) => ({
                        label: origin,
                        value: origin,
                      }))}
                      validation={{ required: 'Origin must be filled' }}
                      required
                    />
                  )}

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-3'>
                    <div className='flex flex-col gap-2'>
                      <Typography variant='h3'>Ingredients</Typography>
                      {Array.from({ length: 20 }, (_, index) => (
                        <Input
                          key={`ingredient${index}`}
                          id={`ingredient${index + 1}`}
                          label={`Ingredient ${index + 1}`}
                          placeholder='Enter ingredient'
                          required={index === 0}
                          readOnly={!isEdit}
                          defaultValue={recipe.ingredients[index]}
                        />
                      ))}
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Typography variant='h3'>Measures</Typography>
                      {Array.from({ length: 20 }, (_, index) => (
                        <Input
                          key={`measure${index}`}
                          id={`measure${index + 1}`}
                          label={`Measure ${index + 1}`}
                          placeholder='Enter measure'
                          required={index === 0}
                          readOnly={!isEdit}
                          defaultValue={recipe.measures[index]}
                        />
                      ))}
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Typography variant='h3'>Steps</Typography>
                      {Array.from({ length: 20 }, (_, index) => (
                        <Input
                          key={`step${index}`}
                          id={`step${index + 1}`}
                          label={`Step ${index + 1}`}
                          placeholder='Enter step'
                          required={index === 0}
                          readOnly={!isEdit}
                          defaultValue={recipe.steps[index]}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex justify-end gap-2 mt-2'>
                  {isEdit ? (
                    <>
                      <Button
                        variant='outline'
                        color='gray'
                        size='sm'
                        onClick={() => setIsEdit(false)}
                      >
                        Cancel
                      </Button>
                      <Button type='submit' isLoading={isLoading}>
                        Submit
                      </Button>
                    </>
                  ) : null}
                </div>
              </form>
            </FormProvider>
          </div>
        </section>
      </main>
    </Layout>
  );
}
