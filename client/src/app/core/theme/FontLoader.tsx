import { FC, useEffect } from 'react';
import { WithChildren } from '../utils/helpers';

/**
 * Component that ensures the Outfit font is loaded before rendering
 * Helps prevent FOUT (Flash of Unstyled Text) when using custom fonts with MUI
 */
const FontLoader: FC<WithChildren> = ({ children }) => {
  useEffect(() => {
    // Create a document.fonts.ready promise to ensure the Outfit font is loaded
    document.fonts.ready.then(() => {
      // Add a class to the body to indicate fonts are loaded
      document.body.classList.add('fonts-loaded');
    });
  }, []);

  return <>{children}</>;
};

export default FontLoader; 