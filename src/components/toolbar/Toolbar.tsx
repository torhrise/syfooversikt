import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Checkbox } from 'nav-frontend-skjema';
import TildelVeileder from './AssignVeileder/TildelVeileder';
import themes from '../../styles/themes';
import { Veileder } from '../../store/veiledere/veiledereTypes';
import { Veilederinfo } from '../../store/veilederinfo/veilederinfoTypes';
import { OverviewTabType } from '../../konstanter';
import Pagination from '../PaginationRow';
import SearchVeileder from './SearchVeileder/SearchVeileder';
import { updateVeilederIdentsFilter } from '../../store/filters/filter_actions';
import countFilterAction from '../../metrics/countFilterAction';
import { CounterFilterActionTypes } from '../../metrics/countFilterAction';

export interface ToolbarProps {
    aktivVeilederInfo: Veilederinfo;
    alleMarkert: boolean;
    numberOfItemsTotal: number;
    buttonHandler: (veilederIdent: string) => void;
    checkAllHandler: (checked: boolean) => void;
    onPageChange: (startItem: number, endItem: number) => void;
    veiledere: Veileder[];
    markertePersoner: string[];
    tabType: OverviewTabType;
}

const tekster = {
    showMore: 'Se alle',
    selectAll: 'Velg alle',
    showLess: 'Vis færre',
};

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
`;

const Innhold = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${themes.color.white};
`;

const Element = styled.div`
  display: flex;
  align-items: center;
  & > div:not(:nth-child(2)) {
    padding: .5em;
  }
`;

const TogglePagination = styled.p`
  cursor: pointer;
  :hover {
    border-bottom: 1px solid ${themes.color.navGra40};
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1em;
  font-weight: bold;
  padding: 0.25em;
  padding-bottom: 0.5em;
  box-sizing: border-box;
  border: 2px solid transparent;
  >:not(:first-child) {
    margin-left: 0.5em;
  }
`;

const PaginationContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const VelgBoks = styled(Checkbox)`
  > .skjemaelement {
    margin: 0px !important;
    padding: 0px !important;
  }
  margin: 0px !important;
  margin-left: 0.5em !important;
`;

const PAGINATED_NUMBER_OF_ITEMS = 50;

export default (props: ToolbarProps) => {

    const [pageInfo, setPageInfo] = useState<{ firstVisibleIndex: number, lastVisibleIndex: number }>(
        {
            firstVisibleIndex: 0,
            lastVisibleIndex: PAGINATED_NUMBER_OF_ITEMS,
        });

    const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(PAGINATED_NUMBER_OF_ITEMS);
    const dispatch = useDispatch();

    const onTogglePaginationClick = () => {
        if (numberOfItemsPerPage === props.numberOfItemsTotal) {
            setNumberOfItemsPerPage(PAGINATED_NUMBER_OF_ITEMS);
        } else {
            setNumberOfItemsPerPage(props.numberOfItemsTotal);
        }
    };

    const getTogglePaginationText = () => {
        if (numberOfItemsPerPage === props.numberOfItemsTotal) {
            return tekster.showLess;
        }
        return tekster.showMore;
    };

    const shouldShowTogglePagination = props.numberOfItemsTotal > PAGINATED_NUMBER_OF_ITEMS;

    const onVeilderIdentsChange = (veilederIdents: string[]) => {
        dispatch(updateVeilederIdentsFilter(veilederIdents));
        countFilterAction(CounterFilterActionTypes.VEILEDER_SOK).next();
    };

    return (<Toolbar>
        <InfoText>
            <div>Viser {pageInfo.firstVisibleIndex + 1}-{pageInfo.lastVisibleIndex} av {props.numberOfItemsTotal} brukere.</div>
            {props.markertePersoner.length > 0 && (
                <div>{props.markertePersoner.length} markerte brukere.</div>
            )}
        </InfoText>
        <Innhold className="blokk-xs">
            <Element>
                <VelgBoks
                    className="toolbar__velgBoks"
                    label={tekster.selectAll}
                    checked={props.alleMarkert}
                    onChange={(event) => {
                        props.checkAllHandler(event.target.checked);
                    }}
                />
                <TildelVeileder {...props} />
                {props.tabType === OverviewTabType.ENHET_OVERVIEW && (
                    <SearchVeileder onSelect={onVeilderIdentsChange} {...props} />)}
            </Element>
            <PaginationContainer>
                {shouldShowTogglePagination &&
                <TogglePagination onClick={onTogglePaginationClick}>{getTogglePaginationText()}</TogglePagination>
                }
                <Pagination
                    numberOfItems={props.numberOfItemsTotal}
                    startPage={0}
                    maxNumberPerPage={numberOfItemsPerPage}
                    onPageChange={(start, end, pageNumber) => {
                        setPageInfo({firstVisibleIndex: start, lastVisibleIndex: end});
                        props.onPageChange(start, end);
                    }}/>
            </PaginationContainer>
        </Innhold>
    </Toolbar>);
};
