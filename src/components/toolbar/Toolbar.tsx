import * as React from 'react';
import styled from 'styled-components';
import TildelVeileder from './AssignVeileder/TildelVeileder';
import themes from '../../styles/themes';
import { Veileder } from '../../store/veiledere/veiledereTypes';
import { Veilederinfo } from '../../store/veilederinfo/veilederinfoTypes';

export interface ToolbarProps {
  aktivVeilederInfo: Veilederinfo;
  buttonHandler: (veilederIdent: string) => void;
  checkAllHandler: (checked: boolean) => void;
  veiledere: Veileder[];
  markertePersoner: string[];
}

const Innhold = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5em
  background-color: ${themes.color.white}
`;

const Element = styled.div`
  display: flex;
`;

const Toolbar = (props: ToolbarProps) => (<Innhold className="blokk-xs">
  <Element>
    <TildelVeileder {...props}/>
  </Element>
</Innhold>);

export default Toolbar;
