import { render } from 'react-dom';
import React from 'react';
import { Landingsside } from './sider/Landingsside';
import './styles/styles.css';

render(<Landingsside />, document.getElementById('maincontent') as HTMLElement);
