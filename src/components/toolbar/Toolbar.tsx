import * as React from 'react';
import styled from 'styled-components';
import TildelVeileder from './AssignVeileder/TildelVeileder';
import themes from '../../styles/themes';
import { Veileder } from '../../store/veiledere/veiledereTypes';
import { Veilederinfo } from '../../store/veilederinfo/veilederinfoTypes';
import { Checkbox } from 'nav-frontend-skjema';
import { OverviewTabType } from '../../konstanter';
import PaginationRow from '../PaginationRow';

export interface ToolbarProps {
  aktivVeilederInfo: Veilederinfo;
  alleMarkert: boolean;
  numberOfItemsDisplayed: number;
  buttonHandler: (veilederIdent: string) => void;
  checkAllHandler: (checked: boolean) => void;
  onPageChange: (startItem: number, endItem: number) => void;
  veiledere: Veileder[];
  markertePersoner: string[];
  tabType: OverviewTabType;
}

const tekster = {
  selectAll: 'Velg alle',
};

const Innhold = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5em;
  background-color: ${themes.color.white};
`;

const Element = styled.div`
  display: flex;
`;

const VelgBoks = styled(Checkbox)`
  margin: 0;
`;

const Toolbar = (props: ToolbarProps) => (<Innhold className="blokk-xs">
  <Element>
    <VelgBoks
      label={tekster.selectAll}
      checked={props.alleMarkert}
      onChange={(event) => {
        props.checkAllHandler(event.target.checked);
      }}
    />
    <TildelVeileder {...props}/>
  </Element>
  <PaginationRow numberOfItems={props.numberOfItemsDisplayed} startPage={0} maxNumberPerPeage={2} onPageChange={(start, end, pageNumber) =>  {
        // tslint:disable-next-line: no-console
        props.onPageChange(start, end);
      }} />
</Innhold>);

export default Toolbar;
