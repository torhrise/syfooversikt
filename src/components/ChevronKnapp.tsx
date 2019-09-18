import React from 'react';
import Chevron from 'nav-frontend-chevron';
import styled from 'styled-components';
import themes from '../styles/themes';
import classNames from 'classnames';

const ChevronButton = styled.button`
    background: transparent;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.25em;
    cursor: pointer;
    color: ${themes.color.navBla};

    :focus {
        outline: ${(props) => props.className === 'invisible'
            ? 'none'
            : 'auto'
        };
        outline-offset: -5px;
    }
`;

const ChevronLabel = styled.span`
    color: #0067c5;
    box-sizing: border-box;
    margin-bottom: 2px;
    border: 2px solid transparent;
    ${ChevronButton}:hover & {
        border-bottom: 1px solid #0067c5;
    }
`;

const ChevronStyled = styled(Chevron)`
    color: ${(props) => props.className === 'invisible'
            ? `${themes.color.invisible}`
            : `${themes.color.navBla}`
    };
`;

const StyledEmptyContainer = styled.div`
    padding: 0.5em;
`;

interface ChevronKnappProps {
    type?: 'høyre' | 'venstre' | 'opp' | 'ned';
    text?: string;
    visible: boolean;
    onClick(): void;
}

const ChevronKnapp = ({ type = 'venstre', text: tekst, visible, onClick }: ChevronKnappProps) => {
    const CustomLabel = <ChevronLabel>{tekst}</ChevronLabel>;
    const colorClassname = classNames(visible
        ? undefined
        : 'invisible'
    );

    return (
        <ChevronButton className={colorClassname} onClick={onClick} >
            {type === 'høyre' && tekst && CustomLabel}
            <ChevronStyled className={colorClassname} type={type} />
            {type === 'venstre' && tekst && CustomLabel}
        </ChevronButton>
    );
};

export default ChevronKnapp;
