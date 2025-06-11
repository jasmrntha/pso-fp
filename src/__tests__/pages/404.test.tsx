import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/pages/404.page';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((msg) => {
    if (msg.includes('ReactDOMTestUtils.act')) return;
    console.error(msg);
  });
});

describe('404', () => {
  it('renders a heading', () => {
    render(<NotFoundPage />);

    const heading = screen.getByText(/not found/i);

    expect(heading).toBeInTheDocument();
  });
});
