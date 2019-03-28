import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';

const tekster = {
  knappTekst: 'Tildel',
};

const TildelVeileder = () => {
  const klikk = (): void => {
    alert('Dette funker ikke! :(((( :-(');
  };

  return (<Hovedknapp onClick={klikk} mini>
    {tekster.knappTekst}
  </Hovedknapp>);
};

export default TildelVeileder;
