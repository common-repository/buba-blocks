import {
  useState,
  useEffect
} from '@wordpress/element';
import { 
  RangeControl 
} from '@wordpress/components';

import TypeSelection from './type-selection';

const MyRangeControler = props => {
  const { 
    value, 
    onChange,
    min,
    max,
    step
  } = props;

  const [stateValue, setStateValue] = useState(value);

  useEffect( () => {
    onChange(stateValue);
  }, [stateValue]);
    
  return( 
    <RangeControl
      min={ min || 1 }
      max={ max || 100 }
      step={ step || 1 }
      value={ stateValue }
      onChange={ setStateValue }
    />
  );
}

const RangeAndTypes = props => {
  const {
    onChange,
    value,
    options,
    label,
    min,
    max,
    step
  } = props;

  return (
    <TypeSelection 
      onChange={ onChange }
      value={ value }
      options={ options }
      Component={ MyRangeControler }
      label={ label }
      min={ min }
      max={ max }
      step={ step }
    />
  );
};

export default RangeAndTypes;