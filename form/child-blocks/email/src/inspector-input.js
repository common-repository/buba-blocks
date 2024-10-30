import { __ } from '@wordpress/i18n';
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { useEffect, useState } from '@wordpress/element';

const InspectorComponent = Component => {
  const InspectorInput = props => {
    const {
      setAttributes,
      attributes
    } = props;
  
    const [inspector, setInspector] = useState( attributes.inspector || { required: false } );
  
    useEffect(() => {
      setAttributes({ inspector });
    }, [inspector]);
  
    return(
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Settings', 'buba-blocks' ) } initialOpen={ false }>
            <ToggleControl 
              label={ __( 'Required', 'buba-blocks' ) }
              checked={ inspector.required || false }
              onChange={ required => setInspector({ ...inspector, required }) }
            />
          </PanelBody>
        </InspectorControls>

        <Component {...props}/>
      </>
    );
  };

  return InspectorInput;
};

export default InspectorComponent;