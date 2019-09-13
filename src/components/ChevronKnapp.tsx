import React from 'react';
import Chevron from 'nav-frontend-chevron';
import styled from 'styled-components';

const ChevronButton = styled.button`
    background: transparent;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.25em;
    cursor: pointer;
    color: #0067c5;

    :focus {
        outline: none;
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
`;

const StyledEmptyContainer = styled.div`
    padding: 0.5em;
`;

interface ChevronKnappProps {
    type?: 'høyre' | 'venstre' | 'opp' | 'ned';
    tekst?: string;
    visible: boolean;
    onClick(): void;
}

const ChevronKnapp = ({ type = 'venstre', tekst, visible, onClick }: ChevronKnappProps) => {
    if (!visible) {
        return <StyledEmptyContainer />;
    }
    const CustomLabel = <ChevronLabel>{tekst}</ChevronLabel>;

    return (
        <ChevronButton tabIndex={0} onClick={onClick} >
            {type === 'høyre' && tekst && CustomLabel}
            <ChevronStyled type={type} />
            {type === 'venstre' && tekst && CustomLabel}
        </ChevronButton>
    );
};

export default ChevronKnapp;
