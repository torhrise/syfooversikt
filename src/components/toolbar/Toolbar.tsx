import * as React from 'react';
import TildelVeileder from './TildelVeileder';

export interface ToolbarProps {
  buttonHandler: () => void;
}

const Toolbar = (props: ToolbarProps) => (<section className="toolbar blokk-xs">
  <div className="toolbar__element toolbar--skille-mellom-elementer">
    <TildelVeileder {...props}/>
  </div>
</section>);

export default Toolbar;
