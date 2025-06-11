import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import DetailRecipe from '@/pages/recipe/[id].page';

// __mocks__/nextRouterMock.ts
export const useRouterMock = {
  query: {},
  pathname: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  asPath: '/',
};

jest.mock('next/router', () => ({
  useRouter: () => useRouterMock,
}));

jest.mock('@tanstack/react-query', () => {
  const original = jest.requireActual('@tanstack/react-query');
  return {
    ...original,
    useQuery: (key: [string]) => {
      if (key[0].includes('/recipes/')) {
        return {
          data: {
            data: {
              id: 123,
              name: 'Mock Recipe',
              description: '',
              category: '',
              vegan: false,
              origin: '',
              thumbnail: '',
              cookTime: 0,
              ingredients: [],
              measures: [],
              steps: [],
              userId: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
            },
          },
        };
      }
      if (key[0].includes('/users/')) {
        return {
          data: { data: { id: 1, name: 'Chef Test' } },
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
  it('renders the recipe name and author', () => {
    renderWithProvider(<DetailRecipe />);
    expect(screen.getByText(/Mock Recipe/i)).toBeInTheDocument();
    expect(screen.getByText(/Chef Test/i)).toBeInTheDocument();
  });
});
