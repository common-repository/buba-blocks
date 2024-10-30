import {
	InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  __experimentalBoxControl as BoxControl
} from '@wordpress/components';
import {
  useState,
  useMemo
} from '@wordpress/element';
import { 
  __ 
} from '@wordpress/i18n';

import ColorControl from '../../components/color-control';
import RangeAndTypes from '../../components/range-and-types';

import { indParse } from '../../assets/funcs';

const StylesEditor = Component => {
  const StylesComponent = props => {
    const {
      attributes,
      setAttributes
    } = props;

    const normalPadding = {
      top: '20px',
      left: '20px',
      right: '20px',
      bottom: '20px',
    };

    const [ styles, setStyles ] = useState( attributes.styles || {} );

    useMemo( () => {
      setAttributes({styles});
    }, [styles]);

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __('Styles', 'buba-blocks') } initialOpen={false}>
            <div className="buba-blocks-side-box">
              <ColorControl
                label={ __( 'Backgeound color', 'buba-blocks' ) }
                value={ styles.background || '#2e2e2e' }
                onChange={ background => setStyles({ ...styles, background }) }
              />
              <ColorControl
                label={ __( 'Text color', 'buba-blocks' ) }
                value={ styles.color || '#fff' }
                onChange={ color => setStyles({ ...styles, color }) }
                gradientLock={ true }
              />
              <PanelBody title={ __( 'Padding', 'buba-blocks' ) } initialOpen={false}>
                <div style={{marginTop: '20px'}}/>
                <BoxControl
                  value={ indParse( styles.padding ) || normalPadding }
                  onChange={ padding => setStyles({ ...styles, padding: indParse( padding ) }) }
                  resetValues={ normalPadding }
                />
              </PanelBody>
              <RangeAndTypes 
                onChange={ borderRadius => setStyles({ ...styles, borderRadius }) }
                value={ styles.borderRadius || 0 }
                label={__( 'Border radius', 'buba-blocks' )}
              />
            </div>
          </PanelBody>
        </InspectorControls>

        <Component {...props} />
      </>
    );
  };

  return StylesComponent;
}

export default StylesEditor;