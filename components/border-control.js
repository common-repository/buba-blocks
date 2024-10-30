import { __ } from '@wordpress/i18n';
import { 
  PanelBody, 
  SelectControl,
  __experimentalBoxControl as BoxControl, 
} from "@wordpress/components";

import { useEffect, useState } from '@wordpress/element';

import borderStyles from '../assets/borderStyles';
import { indParse } from '../assets/funcs';

import ColorControl from './color-control';

const BorderControl = props => {
  const {
    value,
    onChange,
    sizes
  } = props;

  const normalBorderWidth = sizes || {
    top: '1px',
    bottom: '1px',
    right: '1px',
    left: '1px'
  };

  const [border, setBorder] = useState( value || {} );

  useEffect(() => {
    onChange(border);
  }, [border]);

  return (
    <PanelBody title={ __( 'Border', 'buba-blocks' ) } initialOpen={false}>
      <div style={{marginTop: '20px'}}/>
      <div className="buba-blocks-side-box">
        <ColorControl 
          label={ __( 'Color', 'buba-blocks' ) }
          value={ border.borderColor || '#fff' }
          onChange={ borderColor => setBorder({ ...border, borderColor }) }
          gradientLock={ true }
        />
      </div>
      <div className="buba-blocks-box-edit">
        <BoxControl
          label={ __( 'Width', 'buba-blocks' ) }
          value={ indParse( border.borderWidth ) || normalBorderWidth }
          onChange={ borderWidth => setBorder({ ...border, borderWidth: indParse( borderWidth ) }) }
          resetValues={ normalBorderWidth }
        />
        <SelectControl 
          label={ __( 'Style', 'buba-blocks' ) }
          value={ border.borderStyle || 'solid' }
          options={ borderStyles }
          onChange={ borderStyle => setBorder({ ...border, borderStyle }) }
        />
      </div>
    </PanelBody>
  );
}

export default BorderControl;