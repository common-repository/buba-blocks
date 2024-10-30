import {
  useState,
  useMemo
} from '@wordpress/element';
import { 
  ColorPalette,
  ColorIndicator,
  PanelBody,
  __experimentalGradientPicker as GradientPicker,
  TabPanel
} from '@wordpress/components';
import { 
  useSetting
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const EMPTY_ARRAY = [];

const ColorLabel = props => {
  const {
    label,
    color
  } = props;

  const paragraphStyle = {
    display: 'flex', 
    alignItems: 'center',
    marginBottom: '0'
  };

  return (
    <p style={ paragraphStyle }>
      <strong>{ label }</strong>
      <ColorIndicator colorValue={ color } />
    </p>
  );
};

const ColorControl = props => {  
  const {
    label,
    value,
    onChange,
    gradientLock,
    is
  } = props;

  const tabs = [
    {
      name: 'solid',
      title: __( 'Solid', 'buba-blocks' ),
      className: 'tab-solid',
    },
    {
      name: 'gradient',
      title: __( 'Gradient', 'buba-blocks' ),
      className: 'tab-gradient',
    },
  ];

  const gradients = useSetting( 'color.gradients' ) || EMPTY_ARRAY;
  const colors = useSetting( 'color.palette' ) || EMPTY_ARRAY;

  const [color, setColor] = useState( value || '#000' );

  useMemo(() => {
    onChange(color);
  }, [color]);

  if ( ! is )
    return (
      <PanelBody 
        title={ 
          <ColorLabel  
            color={ color }
            label={ label }
          /> 
        } 
        initialOpen= {false }
      >
        <div style={{marginTop: '20px'}}/>
        { gradientLock ?
          <ColorPalette 
            colors={ colors }
            value={ color }
            onChange={ setColor }
          />
          :
          <TabPanel
            tabs={ tabs }
            activeClass="active-tab"
          >
            { tab => 
              tab.name === 'solid' ?
                <ColorPalette 
                  colors={ colors }
                  value={ color }
                  onChange={ setColor }
                />
              : tab.name === 'gradient' &&
                <GradientPicker
                  value={ color }
                  onChange={ setColor }
                  gradients={ gradients }
                />
            }
          </TabPanel>
        }
      </PanelBody>
    );

  return false;
};

export default ColorControl;