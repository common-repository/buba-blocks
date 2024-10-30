/**
 * Internal dependencies
 */
import Accordion from './accordion';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {
    RichText,
    AlignmentToolbar,
    BlockControls,
    InnerBlocks, InspectorControls,
    useBlockProps
} from '@wordpress/block-editor';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

import ColorControl from '../../components/color-control'
import BorderControl from '../../components/border-control'

import defaultColors from '../../assets/defaultColors';

function Edit({attributes, setAttributes, ...props}) {
    const {
        accordionTitle,
        accordionText,
        accordionAlignment,
        accordionFontSize,
        accordionOpen,
        accordionOpenColor,
        border,
        color,
        borderRadius,
        background,
        accordionOpenBgColor,
        borderOpenColor
    } = attributes;

    const setTitle = (newTitle) => {
        setAttributes({accordionTitle: newTitle});
    }

    const style = {
        '--open-color': accordionOpenColor,
        '--bg-open-color': accordionOpenBgColor,
        '--border-open-color': borderOpenColor,
        '--border-width': border?.borderWidth ? border.borderWidth : '0px',
        '--border-style': border?.borderStyle,
        '--border-color': border?.borderColor
    };
    const headerStyle = {
        fontSize: accordionFontSize ? accordionFontSize+'px' : undefined,
        borderRadius: borderRadius ? borderRadius+'px' :undefined,
        background
    };
    const titleStyle = {
        color
    }

    const blockProps = useBlockProps();
    return (
        <>
            <InspectorControls key="inspector">
                <PanelBody title={__('Main settings', 'buba-blocks')} initialOpen={false}>
                        <RangeControl
                            label={ __( 'Title Font Size', 'atomic-blocks' ) }
                            value={ accordionFontSize }
                            onChange={ ( value ) =>
                                setAttributes( {
                                    accordionFontSize: value,
                                } )
                            }
                            min={ 14 }
                            max={ 36 }
                            step={ 1 }
                        />
                        <ToggleControl
                            label={ __( 'Open by default', 'atomic-blocks' ) }
                            checked={accordionOpen }
                            onChange={ () =>
                                setAttributes( {
                                    accordionOpen: !accordionOpen,
                                } )
                            }
                        />
                        
                </PanelBody>
                <PanelBody title={__('Style settings', 'buba-blocks')} initialOpen={false}>
                    <BorderControl
                        value={border}
                        onChange={border => setAttributes({border})}
                    />
                    <hr style={{
                        marginTop: '0',
                        marginBottom: '20px'
                    }} />
                    <RangeControl 
                        label={__('Border radius', 'buba-blocks')}
                        value={parseInt(borderRadius)}
                        onChange={value => setAttributes({borderRadius:value})}
                        min={0}
                        max={100}
                    />
                    <ColorControl 
                        label={__('Title color', 'buba-blocks')}
                        value={color}
                        colors={defaultColors}
                        onChange={color => setAttributes({color})}
                    />
                    <ColorControl 
                        label={__('Background color', 'buba-blocks')}
                        value={background}
                        colors={defaultColors}
                        onChange={background => setAttributes({background})}
                    />
                </PanelBody>
                <PanelBody title={__('Open style settings', 'buba-blocks')} initialOpen={false}>
                    <ColorControl 
                        label={__('Title color')}
                        value={accordionOpenColor}
                        colors={defaultColors}
                        onChange={accordionOpenColor => setAttributes({accordionOpenColor})}
                    />
                    <ColorControl 
                        label={__('Background color', 'buba-blocks')}
                        value={accordionOpenBgColor}
                        colors={defaultColors}
                        onChange={accordionOpenBgColor => setAttributes({accordionOpenBgColor})}
                    />
                    <ColorControl 
                        label={__('Border color', 'buba-blocks')}
                        value={borderOpenColor}
                        colors={defaultColors}
                        onChange={borderOpenColor => setAttributes({borderOpenColor})}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <Accordion key={'buba-accordion-' + props.clientId} props={props} style={style}>
                    <div
                        className="buba-accordion__title-wrap"
                        style={{...headerStyle}}
                    >
                        <RichText
                            tagName="p"
                            placeholder={__('Accordion Title', 'buba-blocks')}
                            value={accordionTitle}
                            className="buba-accordion__title"
                            onChange={setTitle}
                            style={titleStyle}
                        />
                        <span className="buba-arrow-down"/>
                    </div>
                    <div className="buba-accordion__text">
                        <InnerBlocks/>
                    </div>
                </Accordion>
            </div>
        </>
    )
}

export default Edit;