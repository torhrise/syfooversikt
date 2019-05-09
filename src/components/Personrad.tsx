import React, { Component } from 'react';
import {
  Column,
  Row,
} from 'nav-frontend-grid';
import { Checkbox } from 'nav-frontend-skjema';
import { togglePersonMarkert } from '../store/personregister/personregister_action';
import { lenkeTilModiaEnkeltperson } from '../utils/lenkeUtil';
import { PersonData } from '../store/personregister/personregisterTypes';
import {
  hendelsestype,
  skjermingskode,
} from '../utils/personDataUtil';
import { store } from '../store';

interface PersonradProps {
  fnr: string;
  personData: PersonData;
}

interface PersonradState {
  kryssetAv: boolean;
}

class Personrad extends Component<PersonradProps, PersonradState> {
  constructor(props: PersonradProps) {
    super(props);
    this.state = {
      kryssetAv: false
    };
  }

  componentWillReceiveProps(nextProps: PersonradProps) {
    this.setState({
      kryssetAv: nextProps.personData.markert
    });
  }

  render() {
    const {
      fnr,
    } = this.props;
    const erMarkert = this.state.kryssetAv;
    return (
      <Row className="personrad">
      <Column className="personrad__checkbox" md={'2'}>
        <Checkbox label={'Marker'} checked={!!erMarkert} onChange={() => store.dispatch(togglePersonMarkert(fnr))} />
      </Column>
      <Column className="personrad__navn" md={'2'}>{this.props.personData.navn}</Column>
      <Column className="personrad__fnr" md={'2'}>{lenkeTilModiaEnkeltperson(fnr)}</Column>
      <Column className="personrad__skjermet" md={'2'}>{skjermingskode(this.props.personData)}</Column>
      <Column className="personrad__type" md={'2'}>{hendelsestype(this.props.personData)}</Column>
    </Row>);
  }
}

export default Personrad;
