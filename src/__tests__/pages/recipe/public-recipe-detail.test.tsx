import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import DetailRecipe from '@/pages/recipe/[id].page';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '123' },
  }),
}));

jest.mock('@tanstack/react-query', () => {
  const original = jest.requireActual('@tanstack/react-query');
  return {
    ...original,
    useQuery: (key: [string]) => {
      if (key[0].startsWith('/recipes/')) {
        return {
          data: {
            data: {
              id: '123',
              name: 'Chocolate Cake',
              thumbnail: 'cake.jpg',
              category: 'Dessert',
              vegan: true,
              origin: 'France',
              ingredients: ['Flour', 'Sugar', 'Cocoa'],
              measures: ['1 cup', '0.5 cup', '2 tbsp'],
              steps: ['Mix ingredients', 'Bake at 180°C', 'Let cool'],
            },
          },
        };
      }

      if (key[0].startsWith('/users/')) {
        return {
          data: {
            data: {
              id: '123',
              name: 'Chef Pierre',
            },
          },
        };
      }

      return { data: undefined };
    },
  };
});

const renderWithProvider = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('Public Recipe Detail Page', () => {
  it('renders recipe details and author correctly', () => {
    renderWithProvider(<DetailRecipe />);

    expect(
      screen.getByRole('heading', { name: /chocolate cake/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Chef Pierre/i)).toBeInTheDocument();
    expect(screen.getByText(/Dessert/i)).toBeInTheDocument();
    expect(screen.getByText(/Vegan/i)).toBeInTheDocument();
    expect(screen.getByText(/France/i)).toBeInTheDocument();

    // Ingredients
    expect(screen.getByText(/1 cup Flour/)).toBeInTheDocument();
    expect(screen.getByText(/0.5 cup Sugar/)).toBeInTheDocument();

    // Steps
    expect(screen.getByText(/Mix ingredients/)).toBeInTheDocument();
    expect(screen.getByText(/Bake at 180°C/)).toBeInTheDocument();
  });
});
