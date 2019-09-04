import * as React from 'react';
import styled from 'styled-components';
import KnappBase, { KnappBaseProps } from 'nav-frontend-knapper';

interface ConfirmButtonProps extends KnappBaseProps {
  classNameElement: string;
  invisible: boolean;
  onClick: () => void;
  text: string;
}

interface ConfirmButtonBaseProps {
  invisible: boolean;
}

const ConfirmButtonBase = styled(KnappBase)`
  display: ${(props: ConfirmButtonBaseProps) => props.invisible && 'none'};
`;

const ButtonFlexBoxWrapper = styled.div`
  flex: 1 0;
`;

const dynamicClassName = (classNameElement: string, invisible: boolean) => {
  const block = 'confirmVeilederButton';
  const element = `__${classNameElement}`;
  const modifier = `${
    invisible
      ? '--invisible'
      : ''
  }`;

  return `${block}${element}${modifier}`;
};

const ConfirmButton = ((props: ConfirmButtonProps) => {
  return (<ButtonFlexBoxWrapper>
    <ConfirmButtonBase
      invisible={props.invisible}
      className={dynamicClassName(props.classNameElement, props.invisible)}
      type={props.type}
      onClick={props.onClick}
      mini>
      {props.text}
    </ConfirmButtonBase>
  </ButtonFlexBoxWrapper>);
});

export default ConfirmButton;
