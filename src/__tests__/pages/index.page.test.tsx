import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import HomePage from '@/pages/index.page';

// ✅ Updated mock recipe matching RecipeTypes
const mockRecipes = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta',
    category: 'Italian',
    vegan: false,
    cookTime: 25,
    thumbnail:
      'https://www.simplyrecipes.com/thmb/li61VRNwk1nHlkRwVV6vOKImzBI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2020__01__Authentic-Cuban-Sandwich-LEAD-3-d2a86aa6171947fb83af960c53a968b0.jpg',
    origin: 'Italy',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta'],
    measures: ['200g', '2', '100g'],
    steps: ['Boil pasta', 'Cook pancetta', 'Mix with eggs and pasta'],
    userId: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
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
