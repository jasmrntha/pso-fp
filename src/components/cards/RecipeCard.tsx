import { Globe, Timer, Utensils, Vegan } from 'lucide-react';
import React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import { RecipeTypes } from '@/types/entity/recipes';

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export default function RecipeCard({
  recipe,
  href,
}: {
  recipe: RecipeTypes;
  href: string;
}) {
  return (
    <div className='w-full h-full rounded-md bg-white drop-shadow flex flex-col'>
      {/* Image section */}
      <div className='relative w-full'>
        <NextImage
          src={recipe.thumbnail}
          alt='food'
          width={300}
          height={300}
          className='w-full'
          imgClassName='w-full h-52 object-cover rounded-t-md'
        />
        <div className='absolute top-3 right-3 flex flex-col items-center justify-center rounded-md bg-primary-500 px-4 py-3'>
          <div className='flex flex-row items-center gap-1'>
            <Timer size={24} className='text-white' />
            <Typography variant='b3' color='white'>
              {recipe.cookTime} min{recipe.cookTime > 0 ? 's' : ''}
            </Typography>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className='flex flex-col gap-3 py-4 px-6 flex-1'>
        <Typography variant='h3'>{recipe.name}</Typography>

        <div className='flex flex-row items-center justify-between'>
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
        </div>

        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-1'>
            <Globe size={24} />
            <Typography variant='b3'>{recipe.origin}</Typography>
          </div>
        </div>

        <Typography variant='b2'>
          {stripHtml(recipe.description).slice(0, 120)}...
        </Typography>

        {/* Ensure button is always at the bottom */}
        <div className='mt-auto pt-4'>
          <ButtonLink href={href} variant='primary' className='w-full'>
            {href.startsWith('/dashboard/recipes')
              ? 'Edit Recipe'
              : 'View Recipe'}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
