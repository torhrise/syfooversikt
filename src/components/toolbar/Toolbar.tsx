import TildelVeileder from './AssignVeileder/TildelVeileder';
import { OverviewTabType } from '../../konstanter';
import SearchVeileder from './SearchVeileder/SearchVeileder';
import {
    Column,
    Row,
} from 'nav-frontend-grid';
import Sorteringsrad from '../Sorteringsrad';
import { sortBrukere } from '../../store/sorting/sorting_actions';
import React, { useState } from 'react';
import styled from 'styled-components';
import themes from '../../styles/themes';
import { Checkbox } from 'nav-frontend-skjema';
import { useDispatch } from 'react-redux';
import { ToolbarWrapperProps } from './ToolbarWrapper';
import PaginationContainer from './PaginationContainer';

const PAGINATED_NUMBER_OF_ITEMS = 50;

const Innhold = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 .5em;
  border-bottom: 1px solid ${themes.color.navGra40};
`;

const Element = styled.div`
  display: flex;
  align-items: center;
  & > div:not(:nth-child(2)) {
    padding: .5em;
  }
`;

const VelgBoks = styled(Checkbox)`
  > .skjemaelement {
    margin: 0;
    padding: 0;
  }
  margin: 0;
  margin-left: 0.5em;
`;

const RowStyled = styled(Row)`
  margin-left: 0;
  margin-right: 0;
`;

const IngressRad = styled(RowStyled)`
  display: flex;
  align-items: center;
`;

const ToolbarStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${themes.color.white};
  position: sticky;
  top: 0;
  z-index: 1;
  border-radius: 4px;
  border: 1px solid ${themes.color.navGra20};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`;

const tekster = {
    selectAll: 'Velg alle',
};

interface ToolbarProps extends ToolbarWrapperProps {
    setPageInfo: (indices: {firstVisibleIndex: number, lastVisibleIndex: number}) => void;
}

const Toolbar = (props: ToolbarProps) => {
    const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(PAGINATED_NUMBER_OF_ITEMS);
    const dispatch = useDispatch();

    const shouldShowTogglePagination = props.numberOfItemsTotal > PAGINATED_NUMBER_OF_ITEMS;

    return (
        <ToolbarStyled>
            <Innhold>
                <Element>
                    <TildelVeileder {...props} />
                    {props.tabType === OverviewTabType.ENHET_OVERVIEW && (
                        <SearchVeileder {...props} />)}
                </Element>
                <PaginationContainer
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    numberOfItemsTotal={props.numberOfItemsTotal}
                    onPageChange={props.onPageChange}
                    setNumberOfItemsPerPage={setNumberOfItemsPerPage}
                    setPageInfo={props.setPageInfo}
                    shouldShowTogglePagination={shouldShowTogglePagination}
                />
            </Innhold>
            <IngressRad>
                <Column xs="1">
                    <VelgBoks
                        className="toolbar__velgBoks"
                        aria-label={tekster.selectAll}
                        label="&nbsp;"
                        checked={props.alleMarkert}
                        onChange={(event) => {
                            props.checkAllHandler(event.target.checked);
                        }}
                    /></Column>
                <Sorteringsrad onSortClick={(type) => {
                    dispatch(sortBrukere(type));
                }}/>
            </IngressRad>
        </ToolbarStyled>
    );
};

export default Toolbar;
