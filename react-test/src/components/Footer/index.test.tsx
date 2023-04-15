import { render, screen, within } from '@testing-library/react';

import { Footer } from '.';

describe('Footer', () => {
  test(`should render correctly
      - with a lot of stuff
      - with correct classNames
      - and correct 'data-testid' attributes
      - and have an image link redirecting to DOMOS FS website
      - and have a final link redirecting to DOMOS FS website too`, () => {
    render(<Footer />);

    expect(screen.getByTestId('flowbite-footer')).toBeInTheDocument();

    const footerBrand = screen.getByTestId('flowbite-footer-brand');

    expect(footerBrand).toHaveClass('mb-4 flex items-center sm:mb-0');
    expect(footerBrand).toHaveAttribute('href', 'https://domosfs.com/');
    expect(footerBrand).toHaveAttribute('target', '_blank');

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', 'https://domosfs.com/wp-content/uploads/2016/12/blanc.png');
    expect(img).toHaveAttribute('alt', 'Domos FS Logo');

    const copyRight = screen.getByTestId('flowbite-footer-copyright');

    expect(copyRight).toHaveTextContent(new RegExp(`© ${new Date().getFullYear()}Domos FS`, 'gi'));
    expect(within(copyRight).getByRole('link')).toHaveAttribute('href', 'https://domosfs.com/');
  });
});
