import * as React from 'react';
import styled from 'styled-components';
import KnappBase, { KnappBaseProps } from 'nav-frontend-knapper';

interface DropdownButtonProps extends KnappBaseProps {
  classNameElement: string;
  text: string;
}

const ButtonFlexBoxWrapper = styled.div`
  flex: 1 0;
`;

const DropdownButton = ((props: DropdownButtonProps) => {
  return (<ButtonFlexBoxWrapper>
    <KnappBase
      className={`confirmVeilederButton__${props.classNameElement}`}
      type={props.type}
      onClick={props.onClick}
      mini>
      {props.text}
    </KnappBase>
  </ButtonFlexBoxWrapper>);
});

export default DropdownButton;
