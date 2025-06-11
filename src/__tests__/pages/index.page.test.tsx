import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import HomePage from '@/pages/index.page';

const mockRecipes = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta',
    image: 'spaghetti.jpg',
    author: 'Chef John',
    // Add other required fields if any
  },
];

jest.mock('@tanstack/react-query', () => {
  const original = jest.requireActual('@tanstack/react-query');
  return {
    ...original,
    useQuery: () => ({
      data: {
        data: mockRecipes,
      },
    }),
  };
});

const renderWithProvider = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('Home Page', () => {
  it('renders a list of recipes', () => {
    renderWithProvider(<HomePage />);
    expect(screen.getByText(/Trending Recipes/i)).toBeInTheDocument();
    expect(screen.getByText(/Spaghetti Carbonara/i)).toBeInTheDocument();
  });
});
