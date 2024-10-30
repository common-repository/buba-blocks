import { __ } from '@wordpress/i18n';
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TextControl, ToggleControl } from "@wordpress/components";
import { useEffect, useState } from '@wordpress/element';

import {
  normalSettings 
} from './constants';

const InspectorComponent = Component => {
  const InspectorInput = props => {
    const {
      setAttributes,
      attributes
    } = props;
  
    const [inspector, setInspector] = useState( attributes.inspector || normalSettings );
  
    useEffect(() => {
      setAttributes({ inspector });
    }, [inspector]);
  
    return(
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Settings', 'buba-blocks' ) } initialOpen={ false }>
            <ToggleControl 
              label={ __( 'Required', 'buba-blocks' ) }
              checked={ inspector.required || normalSettings.required }
              onChange={ required => setInspector({ ...inspector, required }) }
            />
            <div className="buba-blocks-box-edit">
              <h2 
                style={{
                  marginBottom: '20px', 
                  marginTop: '0'
                }}
              >
                { __( 'Settings for writing', 'buba-locks' ) }
              </h2>
              <TextControl 
                label={ __( 'Field name', 'buba-blocks' ) }
                value={ inspector.field_name || normalSettings.field_name }
                onChange={ field_name => setInspector({ ...inspector, field_name })}
              />
            </div>
          </PanelBody>
        </InspectorControls>

        <Component {...props}/>
      </>
    );
  };

  return InspectorInput;
};

export default InspectorComponent;