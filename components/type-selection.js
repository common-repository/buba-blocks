import {
  useState,
  useMemo
} from '@wordpress/element';
import { PanelBody, SelectControl } from '@wordpress/components';

import typesOfSizes from '../assets/types-of-size';

const TypeSelection = props => {
  const {
    Component,
    onChange,
    label,
    value
  } = props;

  const [type, setType] = useState( typesOfSizes[0].value );
  const [param, setParam] = useState( parseInt(value) );

  useMemo( () => {
    onChange( param+type );
  }, [param, type]);

  const spaceBetweenComponentsStyle = {
    marginTop: '-20px'
  }; 

  return (
    <PanelBody title={ label } initialOpen= {false }>
      <Component
        {...props}
        onChange={ setParam }
        value={ param }
      />
      <div style={ spaceBetweenComponentsStyle } />
      <SelectControl
        options={ typesOfSizes }
        value={ type }
        onChange={ setType }
      />
    </PanelBody>
  );
}

export default TypeSelection;