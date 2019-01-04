import React from 'react';
import { render } from 'react-dom';
import { Landingsside } from '../sider/Landingsside';

function hei() {
    setTimeout(() => {
        render(<Landingsside />, document.getElementById('maincontent') as HTMLElement);
    }, 500);
    render(<LandingssideHeader bilde={'/syfooversikt/src/img/veileder.svg'} />, document.getElementById('maincontent') as HTMLElement);
}

interface LandingssideHeaderProps {
    bilde: string;
}

const LandingssideHeader = (props: LandingssideHeaderProps) => {
    const { bilde } = props;
    return (<div className="landingsside__header">
        <h1>Syfooversikt</h1>
        <img className="header__bilde" src={bilde} alt="veileder" onClick={hei}/>
    </div>);
};

export default LandingssideHeader;
