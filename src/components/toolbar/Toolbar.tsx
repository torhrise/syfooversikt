import * as React from 'react';
import styled from 'styled-components';
import TildelVeileder from './TildelVeileder';
import themes from '../../styles/themes';

export interface ToolbarProps {
  buttonHandler: () => void;
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
