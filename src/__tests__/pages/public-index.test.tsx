/* eslint-disable @typescript-eslint/no-var-requires */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

// Mock ALL modules BEFORE importing the component
jest.mock('@tanstack/react-query', () => {
  const original = jest.requireActual('@tanstack/react-query');
  return {
    ...original,
    useQuery: jest.fn(),
  };
});

// Mock Swiper - these MUST be before the HomePage import
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='swiper'>{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='slide'>{children}</div>
  ),
}));

jest.mock('swiper/modules', () => ({
  Pagination: {},
  Autoplay: {},
}));

jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));

// NOW import the component after all mocks are set up
import HomePage from '@/pages/index.page';

// Data dummy resep
const mockRecipes = [
  {
    id: 1,
    name: 'Nasi Goreng',
    thumbnail:
      'https://www.simplyrecipes.com/thmb/TD_Fj2dYwoIZ14c46s8y20zc10I=/300x200/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Tuna-Salad-Pepperoncini-LEAD-1-0555470e522846e29e3a23102d27f6bd.jpg',
    category: 'Main Dish',
    vegan: false,
    origin: 'Indonesia',
    cookTime: 10,
    ingredients: ['Nasi', 'Kecap'],
    measures: ['1 piring', '2 sdm'],
    steps: ['Panaskan minyak', 'Goreng nasi'],
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

// Helper render dengan provider react-query
const renderWithProvider = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('HomePage with carousel', () => {
  const useQueryMock = require('@tanstack/react-query').useQuery as jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    useQueryMock.mockClear();
    jest.clearAllMocks();
  });

  it('shows Swiper carousel and recipe list', () => {
    useQueryMock.mockReturnValue({ data: { data: mockRecipes } });

    renderWithProvider(<HomePage />);

    // Cek konten dari slide Swiper
    expect(screen.getByText(/Bagikan Resepmu!/i)).toBeInTheDocument();
    expect(screen.getByText(/Tentang Buku Resep/i)).toBeInTheDocument();

    // Cek resep ditampilkan
    expect(screen.getByText(/Daftar Resep/i)).toBeInTheDocument();
    expect(screen.getByText(/Nasi Goreng/i)).toBeInTheDocument();
  });

  it('shows message when no recipes are available', () => {
    useQueryMock.mockReturnValue({ data: { data: [] } });

    renderWithProvider(<HomePage />);

    expect(screen.getByText(/Tidak ada resep/i)).toBeInTheDocument();
  });

  it('scrolls to recipes section when button clicked', () => {
    useQueryMock.mockReturnValue({ data: { data: mockRecipes } });

    // Mock scrollIntoView
    const mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    renderWithProvider(<HomePage />);

    // Klik tombol "Pelajari Lebih Lanjut"
    const button = screen.getByText(/Pelajari Lebih Lanjut/i);
    fireEvent.click(button);

    // Pastikan scroll dipanggil
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
