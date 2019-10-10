import React from 'react';
import { useDispatch } from 'react-redux';
import { resetAllFilters } from '../../store/filters/filter_actions';
import styled from 'styled-components';
import themes from '../../styles/themes';
import SlettIkon from '../common/SlettIkon';

const ClearFiltersWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    border: 2px solid transparent;
    color: ${themes.color.navBla};
    font-size: 16px;
    font-weight: 500;
    padding: 0.25em;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    :hover {
        cursor: pointer;

        #text {
            border-bottom: 1px solid ${themes.color.navBla}
        }
    }
    :active {
        border: 2px solid ${themes.color.navBla}
    }
    > svg {
        margin-right: 0.25em;
    }
`;

export default (props: any) => {
    const dispatch = useDispatch();

    const clearAllFilters = () => {
        dispatch(resetAllFilters());
    };

    return (
        <div className={props.className}>
            <ClearFiltersWrapper onClick={clearAllFilters}>
                <SlettIkon fargeKode={themes.color.navBla}/>
                Nullstill valg
            </ClearFiltersWrapper>
        </div>
    );
};
