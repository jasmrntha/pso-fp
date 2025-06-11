import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import DashboardPage from '@/pages/dashboard/index.page';

// 🧪 Mock the router and withAuth
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/hoc/withAuth', () => ({
  __esModule: true,
  default: (Component: any) => Component, // mock HOC passthrough
}));

describe('DashboardPage', () => {
  it('redirects to /dashboard/recipes and shows loading', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<DashboardPage />);

    // Ensure redirect was called
    expect(pushMock).toHaveBeenCalledWith('/dashboard/recipes');

    // Ensure loading UI is visible
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
