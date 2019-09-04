import * as React from 'react';
import styled from 'styled-components';
import { Input } from 'nav-frontend-skjema';
import SearchIcon from '../img/icons/SearchIcon';
import themes from '../styles/themes';
import { ChangeEvent } from 'react';

interface InputWithSearchIconProps {
  autofocus: boolean;
  label: string;
  onChange: (event: ChangeEvent) => void;
  placeholder: string;
  type: string;
  value: string;
}

const InputDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;
const StyledInput = styled(Input)`
  margin: .5em;
  width: 100%;
  outline: none;
`;

const StyledSearchIcon = styled(SearchIcon)`
  fill: ${themes.color.navBla};
  position: absolute;
  margin-left: -1em;
`;

const InputWithSearchIcon = (props: InputWithSearchIconProps) => {
  const {
    autofocus,
    label,
    onChange,
    placeholder,
    type,
    value,
  } = props;
  return (<InputDiv className="inputWithSearchIcon">
    <StyledInput
      className="inputWithSearchIcon__input"
      label={label}
      value={value}
      type={type}
      onChange={(event) => onChange(event)}
      placeholder={placeholder}
      autoFocus={autofocus}
    />

    <StyledSearchIcon className="inputWithSearchIcon__searchIcon" />
  </InputDiv>);
};

export default InputWithSearchIcon;
