import {
	InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  __experimentalBoxControl as BoxControl,
  FontSizePicker
} from '@wordpress/components';
import {
  useState,
  useMemo
} from '@wordpress/element';
import { 
  __ 
} from '@wordpress/i18n';

import {
  indParse
} from '../../../../assets/funcs';
import ColorControl from '../../../../components/color-control';
import BorderControl from '../../../../components/border-control';
import fontSizes from '../../../../assets/fontSizes';
import RangeAndTypes from '../../../../components/range-and-types';
import SizesControl from '../../../../components/sizes-control';
 

const fallbackFontSize = 18;
const normalBorderWidth = {
  top: '0px',
  left: '0px',
  right: '0px',
  bottom: '1px',
};
const normalPadding = {
  top: '20px',
  left: '0px',
  right: '0px',
  bottom: '20px',
};

const StylesEditor = Component => {
  const StylesComponent = props => {
    const {
      attributes,
      setAttributes
    } = props;

    const [ styles, setStyles ] = useState( attributes.styles || {} );

    useMemo( () => {
      setAttributes({styles});
    }, [styles]);

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Styles', 'buba-blocks' ) } initialOpen={false}>
            <div className="buba-blocks-side-box">
              <BorderControl 
                value={ styles.border || {} }
                onChange={ border => setStyles({ ...styles, ...border }) }
                sizes={ normalBorderWidth }
              />
              <RangeAndTypes 
                onChange={ borderRadius => setStyles({ ...styles, borderRadius }) }
                value={ styles.borderRadius || 0 }
                label={__( 'Border radius', 'buba-blocks' )}
              />
              <ColorControl
                label={ __( 'Background', 'buba-blocks' ) }
                value={ styles.background || 'transparent' }
                onChange={ background => setStyles({ ...styles, background }) }
              />
              <ColorControl
                label={ __( 'Color', 'buba-blocks' ) }
                value={ styles.color || '#fff' }
                onChange={ color => setStyles({ ...styles, color }) }
                gradientLock={ true }
              />
              <PanelBody title={ __( 'Font size', 'buba-blocks' ) } initialOpen={false}>
                <FontSizePicker 
                  value={ styles.fontSize ? parseInt( styles.fontSize ) : 16 }
                  fallbackFontSize={ fallbackFontSize }
                  fontSizes={ fontSizes }
                  onChange={ fontSize => setStyles({ ...styles, fontSize: fontSize+'px' }) }
                />
              </PanelBody>
              <PanelBody title={ __( 'Padding', 'buba-blocks' ) } initialOpen={false}>
                <div style={{marginTop: '20px'}}/>
                <BoxControl 
                  value={ indParse( styles.padding ) || normalPadding }
                  onChange={ padding => setStyles({ ...styles, padding: indParse( padding ) }) }
                  resetValues={ normalPadding }
                />
              </PanelBody>
              <SizesControl 
                exclude="width"
                value={ styles }
                onChange={ sizes => setStyles({ ...styles, ...sizes })}
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