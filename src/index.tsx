import { render } from 'react-dom';
import React from 'react';
import { Landingsside } from './sider/Landingsside';
import './styles/styles.css';

const config = {
  config: {
    toggles: {
      visEnhet: true,
      visSokefelt: true,
      visVeileder: true,
    },
    fnr: '17086800071',
    applicationName: 'Syfooversikt',
  },
};

(window as any).renderDecoratorHead(config);

render(<Landingsside />, document.getElementById('maincontent') as HTMLElement);
