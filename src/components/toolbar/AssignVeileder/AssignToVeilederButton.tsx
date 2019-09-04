import styled from 'styled-components';
import NavFrontendChevron from 'nav-frontend-chevron';
import * as React from 'react';
import ArrowRightIcon from '../../../img/icons/ArrowRightIcon';
import themes from '../../../styles/themes';

const texts = {
  assignOtherVeileder: 'Tildel veileder',
};

const ButtonDiv = styled.div`
  padding: .5em;
  cursor: pointer;

  & > * {
  margin: .5em;
  vertical-align: middle;
  }
`;

const ActiveText = styled.span`
  color: ${themes.color.navBla};
`;

const InactiveText = styled.span`
  color: black;
`;

const ActiveChevron = styled(NavFrontendChevron)`
  color: ${themes.color.navBla};
`;

const InactiveChevron = styled(NavFrontendChevron)`
  color: black;
`;

const ActiveArrowIcon = styled(ArrowRightIcon)`
  fill: ${themes.color.navBla};
`;

const InactiveArrowIcon = styled(ArrowRightIcon)`
  fill: black;
`;

interface AssignToVeilederButtonProps {
  userIsChecked: boolean;
  onClick: () => void;
  showList: boolean;
}

const chevronType = (showList: boolean) => {
  return showList
    ? 'opp'
    : 'ned';
};

const ActiveButton = (props: AssignToVeilederButtonProps) => {
  return (<>
    <ActiveArrowIcon className="assignToOtherVeilederButton__icon--active" />
    <ActiveText>{texts.assignOtherVeileder}</ActiveText>
    <ActiveChevron type={chevronType(props.showList)} />
  </>);
};

const InactiveButton = (props: AssignToVeilederButtonProps) => {
  return (<>
    <InactiveArrowIcon className="assignToOtherVeilederButton__icon--inactive" />
    <InactiveText>{texts.assignOtherVeileder}</InactiveText>
    <InactiveChevron type={chevronType(props.showList)} />
  </>);
};

const AssignToVeilederButton = (props: AssignToVeilederButtonProps) => {
  return (<ButtonDiv className="assignToOtherVeilederButton" onClick={props.onClick}>
    {
      props.userIsChecked
        ? <ActiveButton {...props} />
        : <InactiveButton {...props} />
    }
  </ButtonDiv>);
};

export default AssignToVeilederButton;
