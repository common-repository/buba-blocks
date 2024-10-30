/**
 * Inspector Controls.
 */

/**
 * Internal dependencies.
 */

/**
 * Setup the block.
 */
import {__} from '@wordpress/i18n';

/**
 * Import block dependencies.
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Import Inspector components.
 */
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Create an Inspector Controls wrapper Component.
 */
export default function Inspector (props) {

        return (
            <InspectorControls key="inspector">
                <PanelBody title={__('Accordion settings', 'buba-blocks')} initialOpen={false}>
                    <RenderSettingControl id="ab_accordion_accordionFontSize">
                        <RangeControl
                            label={ __( 'Title Font Size', 'atomic-blocks' ) }
                            value={ this.props.attributes.accordionFontSize }
                            onChange={ ( value ) =>
                                this.props.setAttributes( {
                                    accordionFontSize: value,
                                } )
                            }
                            min={ 14 }
                            max={ 24 }
                            step={ 1 }
                        />
                    </RenderSettingControl>

                    <RenderSettingControl id="ab_accordion_accordionOpen">
                        <ToggleControl
                            label={ __( 'Open by default', 'atomic-blocks' ) }
                            checked={ this.props.attributes.accordionOpen }
                            onChange={ () =>
                                this.props.setAttributes( {
                                    accordionOpen: ! this.props.attributes
                                        .accordionOpen,
                                } )
                            }
                        />
                    </RenderSettingControl>
                </PanelBody>
            </InspectorControls>
        );
}
