/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {
    useBlockProps, InspectorControls,
} from '@wordpress/block-editor';

import {dispatch} from '@wordpress/data';


import {
    PanelBody,
    TextControl,
    Notice,
    FocusableIframe, RangeControl, SelectControl,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';
import languages from "../../assets/languages";

function MapHeightEdit({displayName, height, setAttributes}) {
    const setMapHeightEdit = (newHeight) => {
        setAttributes({[displayName]: newHeight});
    }
    const units = [
        {value: 'px', label: 'px', default: 0},
        {value: '%', label: '%', default: 10}
    ];

    return <UnitControl
        units={units}
        label={__('Map height', 'buba-blocks')}
        onChange={setMapHeightEdit}
        value={height}/>
}


function Edit({attributes, setAttributes,...props}) {
    const {
        key,
        address,
        zoom,
        height,
        language,
    } = attributes;

    const DEFAULT_LANGUAGE = 'en';

    const language_par = language ? language : DEFAULT_LANGUAGE;
    const blockProps = useBlockProps({
        style: {
            height: height ? height : undefined
        }
    });

    const src = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${address}&zoom=${zoom}&language=${language_par}`;

    const selectedBlock = () => {
        dispatch('core/block-editor').selectBlock(props.clientId);
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('General', 'buba-blocks')} className="buba-map__settings">
                    <Notice status="success"
                            isDismissible={false}
                    >
                        {__('This block uses Google Maps API key to display the map.', 'buba-blocks')}
                    </Notice>
                    <TextControl
                        label="Google Maps Api Key"
                        value={key}
                        onChange={(value) => {
                            setAttributes({key: value})
                        }}
                    />
                    <TextControl
                        label="Address"
                        value={decodeURI(address)}
                        onChange={(value) => {
                            setAttributes({address: encodeURI(value)})
                        }}
                    />
                    <MapHeightEdit 
                        displayName="height"
                        height={height}
                        setAttributes={setAttributes}
                    />
                    <RangeControl
                        value={zoom}
                        label={__('Zoom', 'buba-blocks')}
                        min={1}
                        max={22}
                        allowReset
                        onChange={(zoom) => {
                            setAttributes({
                                zoom
                            })
                        }}
                    />
                    <SelectControl
                        label={__('Language', 'buba-blocks')}
                        value={language}
                        onChange={(language) => {
                            setAttributes({
                                language
                            })
                        }}
                        options={languages}
                    />
                </PanelBody>
            </InspectorControls>
            <div
                {...blockProps}
                className={classnames('buba-map-wrap', blockProps.className, {},)}
                style={{
                    ...blockProps.style,
                }}
            >
                <FocusableIframe
                    style={{
                        height: height ? height : undefined,
                    }}
                    className="buba-map__iframe"
                    src={src}
                    onFocus={selectedBlock}
                />

            </div>
        </>
    )
}

export default Edit;