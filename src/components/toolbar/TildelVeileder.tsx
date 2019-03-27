import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';

const TildelVeileder = () => {
  const klikk = (): void => {
    alert('Dette funker ikke! :(((( :-(');
  };

  return (
    <Hovedknapp onClick={klikk} mini>
      Tildel
    </Hovedknapp>
  );
};

export default TildelVeileder;
