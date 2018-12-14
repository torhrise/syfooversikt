import React from 'react';
import PropTypes from 'prop-types';
import ikoner from '../img/ikoner';

const LandingssideHeader = ({ bilde }) => {
    return (<div className="landingsside__header">
        {<h1>Syfooversikt</h1>}
        {bilde && <img className="header__bilde" src={ikoner.veilederIkon} alt="veileder" />}
    </div>);
};

LandingssideHeader.propTypes = {
    bilde: PropTypes.string,
};

export default LandingssideHeader;