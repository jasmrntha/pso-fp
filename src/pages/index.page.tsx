'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import * as React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// Komponen internal
import RecipeCard from '@/components/cards/RecipeCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

// Tipe data
import { ApiResponse } from '@/types/api';
import { RecipeTypes } from '@/types/entity/recipes';

export default function HomePage() {
  const { data: queryData } = useQuery<ApiResponse<RecipeTypes[]>>([
    '/recipes',
  ]);
  const recipes = queryData?.data;

  const handleScrollToRecipes = () => {
    const section = document.getElementById('resep-anda');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout withHeader={true}>
      <Seo templateTitle='Home' />

      <main className='mx-auto flex w-11/12 flex-col gap-12 py-8 md:w-10/12'>
        {/* Carousel Slide */}
        <div className='group relative w-full overflow-hidden rounded-xl bg-orange-50 shadow-md'>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: '.custom-swiper-button-next',
              prevEl: '.custom-swiper-button-prev',
            }}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className='flex flex-col items-center justify-center gap-6 px-6 py-10 md:flex-row md:justify-between'>
                <div className='max-w-lg text-center md:text-left'>
                  <h2 className='text-3xl font-bold text-orange-600'>
                    Bagikan Resepmu!
                  </h2>
                  <p className='mt-2 text-base text-gray-700'>
                    Jadikan resep andalanmu terkenal. Yuk upload sekarang!
                  </p>
                  <Link href='/auth/login'>
                    <button className='mt-4 rounded-lg bg-orange-500 px-6 py-2 text-white transition hover:bg-orange-600'>
                      Tambah Resep
                    </button>
                  </Link>
                </div>
                <div className='hidden md:block'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src='https://www.simplyrecipes.com/thmb/CmndfynkbnSSv1UCe0XmdfzC1zA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Flourless-Chocolate-Cake-Lead-4-e0af2121860246069420d0af5856d447.jpg'
                    alt='Ilustrasi Upload Resep'
                    className='w-72 rounded-lg object-cover shadow-md'
                  />
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className='flex flex-col items-center justify-center gap-6 px-6 py-10 md:flex-row md:justify-between'>
                <div className='max-w-lg text-center md:text-left'>
                  <h2 className='text-3xl font-bold text-orange-600'>
                    Tentang Buku Resep
                  </h2>
                  <p className='mt-2 text-base text-gray-700'>
                    Platform berbagi resep mudah dan gratis.
                  </p>
                  <button
                    onClick={handleScrollToRecipes}
                    className='mt-4 rounded-lg bg-orange-500 px-6 py-2 text-white transition hover:bg-orange-600'
                  >
                    Pelajari Lebih Lanjut
                  </button>
                </div>
                <div className='hidden md:block'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src='https://www.simplyrecipes.com/thmb/70mALXbvWjihKZqjsU8uxt3wFWs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Spanish-Garlic-Shrimp-LEAD-2-8b7bc797105b41908dcbc58ef007da75.jpg'
                    alt='Ilustrasi Tentang Buku Resep'
                    className='w-72 rounded-lg object-cover shadow-md'
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Tombol panah custom */}
          <div className='custom-swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 opacity-0 transition duration-300 group-hover:opacity-100'>
            <div className='ml-2 cursor-pointer text-3xl text-gray-700 hover:text-orange-500'>
              ←
            </div>
          </div>
          <div className='custom-swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 opacity-0 transition duration-300 group-hover:opacity-100'>
            <div className='mr-2 cursor-pointer text-3xl text-gray-700 hover:text-orange-500'>
              →
            </div>
          </div>
        </div>

        {/* Daftar Resep */}
        <section id='resep-anda' className='flex flex-col gap-4 bg-white'>
          <Typography variant='j2'>Daftar Resep</Typography>
          {recipes?.length === 0 ? (
            <Typography variant='b2'>Tidak ada resep</Typography>
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
