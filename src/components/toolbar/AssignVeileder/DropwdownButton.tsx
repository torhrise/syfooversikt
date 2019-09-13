import * as React from 'react';
import styled from 'styled-components';
import KnappBase, { KnappBaseProps } from 'nav-frontend-knapper';

interface DropdownButtonProps extends KnappBaseProps {
  classNameElement: string;
  invisible: boolean;
  text: string;
}

interface ConfirmButtonBaseProps {
  invisible: string;
}

const DropwdownButtonBase = styled(KnappBase)`
  display: ${(props: ConfirmButtonBaseProps) => props.invisible === 'true' && 'none'};
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

const DropwdownButton = ((props: DropdownButtonProps) => {
  return (<ButtonFlexBoxWrapper>
    <DropwdownButtonBase
      invisible={props.invisible.toString()}
      className={dynamicClassName(props.classNameElement, props.invisible)}
      type={props.type}
      onClick={props.onClick}
      mini>
      {props.text}
    </DropwdownButtonBase>
  </ButtonFlexBoxWrapper>);
});

export default DropwdownButton;
