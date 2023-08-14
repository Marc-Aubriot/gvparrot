/* dependencies */
import { getByRole, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';

/* components */
import EspacePro from './Espacepro';

describe("Intégration EspacePro fx de connexion", ()=> {

  it("should generate a h1 title", async () => {
    const { getByText } = await render(
      <Router>
        <EspacePro />
      </Router>
    );

    const titleText = getByText('Mon espace professionnel');

    expect(titleText).toHaveTextContent('Mon espace professionnel');
  })

  it("should generate mail and pass input field", async () => {
    const { getByLabelText } = await render(
      <Router>
        <EspacePro />
      </Router>
    );

    const inputMail = getByLabelText('Email');
    const inputPass = getByLabelText('Password');

    expect(inputMail.id).toBe('mail');
    expect(inputPass.id).toBe('pass');
  })

  it("should generate a connection button", async () => {
    const { getByRole } = await render(
      <Router>
        <EspacePro />
      </Router>
    );

    const connectionBtn = getByRole('button');

    expect(connectionBtn.type).toBe('submit');
  })

  it("should generate a response on click connection button", async () => {
    const { container } = await render(
      <Router>
        <EspacePro />
      </Router>
    );

    const connectionBtn = getByRole(container, 'button');
    fireEvent.click(connectionBtn);

    await waitFor( () => expect(screen.getByText('Formulaire de connection envoyé')).toBeInTheDocument());
  })

})