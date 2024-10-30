import { __ } from '@wordpress/i18n';
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TextControl } from "@wordpress/components";
import { useEffect, useState } from '@wordpress/element';

import {
  normalSettings,
  notyThemes
} from './constants';

const InspectorComponent = Component => {
  const InspectorForm = props => {
    const {
      setAttributes,
      attributes
    } = props;

    const siteOptions = wp.data.select('core').getSite();
  
    const [inspector, setInspector] = useState( attributes.inspector || normalSettings );
  
    useEffect(() => {
      if ( siteOptions?.email && ! inspector.to && inspector.to !== '' ) {
        setInspector({ ...inspector, to: siteOptions.email });
      }

      setAttributes({ inspector });
    }, [inspector, siteOptions]);
  
    return(
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Settings', 'buba-blocks' ) } initialOpen={ false }>
            <SelectControl
              label={ __( 'Select a notification subject', 'buba-blocks' ) }
              value={ inspector.noty || normalSettings.noty }
              onChange={ noty => setInspector({ ...inspector, noty }) }
              options={ notyThemes }
            />
            <TextControl 
              label={ __( 'Enter your email address to send', 'buba-blocks' ) }
              value={ inspector.to }
              onChange={ to => setInspector({ ...inspector, to })}
            />
            <TextControl 
              label={ __( 'Specify the subject of your email', 'buba-blocks' ) }
              value={ inspector.subject }
              onChange={ subject => setInspector({ ...inspector, subject })}
            />
          </PanelBody>
        </InspectorControls>

        <Component {...props}/>
      </>
    );
  };

  return InspectorForm;
};

export default InspectorComponent;