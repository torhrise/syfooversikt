import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ToolbarProps } from './Toolbar';

const tekster = {
  knappTekst: 'Tildel',
};

const TildelVeileder = (props: ToolbarProps) => {
  return (<Hovedknapp onClick={() => props.buttonHandler()} mini>
    {tekster.knappTekst}
  </Hovedknapp>);
};

export default TildelVeileder;
