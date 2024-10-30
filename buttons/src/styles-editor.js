import {
	InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody
} from '@wordpress/components';
import {
  useState,
  useEffect
} from '@wordpress/element';
import { 
  __ 
} from '@wordpress/i18n';

import { 
  minGapBetweenButtons,
  maxGapBetweenButtons
} from './constants';

import RangeAndTypes from '../../components/range-and-types';

const StylesEditor = Component => {
  const StylesComponent = props => {
    const {
      attributes,
      setAttributes
    } = props;

    const [ styles, setStyles ] = useState( attributes.styles || {} );

    useEffect( () => {
      setAttributes({styles});
    }, [styles, setAttributes, attributes]);

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __('Styles', 'buba-blocks') } initialOpen={false}>
            <RangeAndTypes 
              onChange={ gap => setStyles({ ...styles, gap }) }
              value={ styles.gap || minGapBetweenButtons }
              label={__( 'Set the gap and type of gap', 'buba-blocks' )}
              min={ minGapBetweenButtons }
              max={ maxGapBetweenButtons }
              step={ minGapBetweenButtons }
            />
          </PanelBody>
        </InspectorControls>

        <Component {...props} />
      </>
    );
  };

  return StylesComponent;
}

export default StylesEditor;