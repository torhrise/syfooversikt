import * as React from 'react';
import styled from 'styled-components';
import TildelVeileder from './TildelVeileder';

export interface ToolbarProps {
  buttonHandler: () => void;
}

const Innhold = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Element = styled.div`
  display: flex;
`;

const Toolbar = (props: ToolbarProps) => (<Innhold className="panel blokk-xs">
  <Element>
    <TildelVeileder {...props}/>
  </Element>
</Innhold>);

export default Toolbar;
