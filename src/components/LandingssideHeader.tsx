import React from 'react';

interface LandingssideHeaderProps {
    bilde: string;
}

const LandingssideHeader = (props: LandingssideHeaderProps) => {
    const { bilde } = props;
    return (<div className="landingsside__header">
        <h1>Syfooversikt</h1>
        <img className="header__bilde" src={bilde} alt="veileder" />
    </div>);
};

export default LandingssideHeader;
