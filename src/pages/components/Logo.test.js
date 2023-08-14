/* dependencies */
import { render } from '@testing-library/react';

/* components */
import Logo from './Logo';


// Test si le composant Logo existe et possède alt, src et class
test('render Logo', async () => {
  // 1) Génération
  const { getAllByAltText } = await render(<Logo />); 

  // 2) Actions
  const element = getAllByAltText(/Logo du site/i);

  // 3) Assertions
  expect(element[0].alt).toBe('Logo du site');
  expect(element[0].src).toBe('http://localhost/logo200px.png');
  expect(element[0].className).toBe('logo');
  expect(element).toHaveLength(1);
});
