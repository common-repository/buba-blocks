/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps,
    RichText,
    MediaUpload
} from '@wordpress/block-editor';

import {
    PanelBody,
    ToggleControl,
    SelectControl,
    ColorPalette,
    CheckboxControl,
    RangeControl,
    Button,
    Dashicon,
    __experimentalBoxControl as BoxControl,
    Dropdown
} from '@wordpress/components';

/**
 * Components
 */
import RenderHeader from './renderHeader';

function InfoBoxEdit({attributes, setAttributes}) {
    let iconControl = null
    let imageControl = null;
    let imagePlaceholder = null;
    let iconPlaceholder = null;
    let settingLine = null;
    let renderLine = null;

    const {
        titleDecoration,
        titleLineColor,
        titleMarginBottom,
        titlePaddingBottom,
        title,
        titlePosition,
        titleTag,
        textPosition,
        textSize,
        text,
        isIcon,
        isIconSize,
        iconSize,
        image,
        imageMB,
        imageHeight,
        iconBox,
        icon
    } = attributes;

    const blockProps = useBlockProps( {
        className: 'wp-block-info-box',
    } );

    const iconWidthLabel = () => {
        if (isIconSize) {
            return __('Icon size(px):', 'buba-blocks');
        } else {
            return __('Icon width(px):', 'buba-blocks');
        }
    }

    if (titleDecoration) {
        settingLine = <>
            <p>Line color:</p>
            <ColorPalette
                colors={ [
                    { name: __('Blue-sky', 'buba-blocks'), color: '#14CBCB' },
                    { name: __('Green', 'buba-blocks'), color: '#B8D736' },
                    { name: __('Orange', 'buba-blocks'), color: '#FF8C1A' },
                ] }
                value={ titleLineColor }
                onChange={ titleLineColor => setAttributes({titleLineColor}) }
            />
        </>;

        renderLine = <div 
            className={`wp-block-info-box__line`}
            style={{backgroundColor: titleLineColor}}
        ></div>;
    }

    
    if (image !== null && image !== '' && image !== undefined) {
        imagePlaceholder = <img src={ image['url'] } width="100" height="60" style={{objectFit: 'cover', marginBottom: '10px', display: 'block'}} />;
    }
    
    if (icon !== null && icon !== '' && icon !== undefined) {
        iconPlaceholder = <img src={ icon['url'] } width="60" height="60" style={{objectFit: 'cover', marginBottom: '10px', display: 'block'}} />;
    }


    if (isIcon) {
        imageControl = 
            <>
                {iconPlaceholder}
                <MediaUpload
                    onSelect={ icon => setAttributes({ icon }) }
                    allowedTypes={ ['image'] }
                    value={ icon }
                    render={ ( { open } ) => (
                        <Button 
                            onClick={ open }
                            className="is-large"
                            isPrimary
                            style={{marginBottom: '20px'}}
                        >
                            <Dashicon icon="upload" style={{marginRight: '5px'}}/>
                            {__('Select icon', 'buba-blocks')}
                        </Button>
                    ) }
                />
                { 
                    icon ? 
                    <Button 
                        onClick={ () => setAttributes({icon: null}) }
                        isStadnard
                        style={{
                            marginBottom: '20px',
                            marginLeft: '5px'
                        }}
                    >
                        <Dashicon icon="trash" style={{marginRight: '5px'}}/>
                        {__('Reset icon', 'buba-blocks')}
                    </Button> :
                    null
                }
                <CheckboxControl
                    label={ __('Same width and height', 'buba-blocks') }
                    checked={ isIconSize }
                    onChange={ (isIconSize) => { 
                        setAttributes({isIconSize});
                        if (isIconSize) setAttributes( { iconSize: [ iconSize[0], iconSize[0] ] } );
                    } }
                />
                <RangeControl
                    label={ iconWidthLabel() }
                    value={ iconSize[0] }
                    onChange={ ( width ) => {
                        setAttributes({iconSize: [width, iconSize[1]]});
                        if (isIconSize) setAttributes( { iconSize: [ width, width ] } );
                    } }
                    min={ 10 }
                    max={ 140 }
                />
                <BoxControl
                    label={__('Icon padding:', 'buba-blocks')}
                    values={ iconBox }
                    onChange={ iconBox => setAttributes( { iconBox } ) }
                />
            </>
        ;
    }
    else {
        imageControl = 
            <>
                {imagePlaceholder}
                <MediaUpload
                    onSelect={ image => setAttributes({ image }) }
                    allowedTypes={ ['image'] }
                    value={ image }
                    render={ ( { open } ) => (
                        <Button 
                            onClick={ open }
                            className="is-large"
                            isPrimary
                            style={{marginBottom: '20px'}}
                        >
                            <Dashicon icon="upload" style={{marginRight: '5px'}}/>
                            {__('Select image', 'buba-blocks')}
                        </Button>
                    ) }
                />
                { 
                    image ? 
                    <Button 
                        onClick={ () => setAttributes({image: null}) }
                        isStadnard
                        style={{
                            marginBottom: '20px',
                            marginLeft: '5px'
                        }}
                    >
                        <Dashicon icon="trash" style={{marginRight: '5px'}}/>
                        {__('Reset image', 'buba-blocks')}
                    </Button> :
                    null
                }
                <SelectControl
                    label={ __( 'Image margin bottom:', 'buba-blocks' ) }
                    value={ imageMB }
                    options={ [
                        { label: __( 'Small', 'buba-blocks' ), value: '15px' },
                        { label: __( 'Medium', 'buba-blocks' ), value: '25px' },
                        { label: __( 'Large', 'buba-blocks' ), value: '35px' },
                    ] }
                    onChange={ imageMB => setAttributes({imageMB}) }
                />
                <SelectControl
                    label={ __( 'Image height:', 'buba-blocks' ) }
                    value={ imageHeight }
                    options={ [
                        { label: __( 'Small', 'buba-blocks' ), value: '300px' },
                        { label: __( 'Medium', 'buba-blocks' ), value: '450px' },
                        { label: __( 'Large', 'buba-blocks' ), value: '600px' },
                    ] }
                    onChange={ imageHeight => setAttributes({imageHeight}) }
                />
            </>
        ;
    }

    if (!isIconSize && isIcon) {
        iconControl = 
            <RangeControl
                label={ __('Icon height(px):', 'buba-blocks') }
                value={ iconSize[1] }
                onChange={ ( height ) => setAttributes( { iconSize: [ iconSize[0], height ] } ) }
                min={ 10 }
                max={ 140 }
            />;
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Header settings', 'buba-blocks')} initialOpen={ false }>
                    <ToggleControl
                        label={ __( 'Select image/icon', 'buba-blocks' ) }
                        checked={ isIcon }
                        onChange={ ( isIcon ) =>
                            setAttributes( { isIcon } )
                        }
                    />
                    {imageControl}
                    {iconControl}
                </PanelBody>
                <PanelBody title={__('Title settings', 'buba-blocks')} initialOpen={ false }>
                    <SelectControl
                        label={ __( 'Title tag:', 'buba-blocks' ) }
                        value={ titleTag }
                        options={ [
                            { label: __( 'H2', 'buba-blocks' ), value: 'h2' },
                            { label: __( 'H3', 'buba-blocks' ), value: 'h3' },
                            { label: __( 'H4', 'buba-blocks' ), value: 'h4' },
                            { label: __( 'H5', 'buba-blocks' ), value: 'h5' },
                            { label: __( 'H6', 'buba-blocks' ), value: 'h6' },
                        ] }
                        onChange={ titleTag => setAttributes({titleTag}) }
                    />
                    <SelectControl
                        label={ __( 'Title position:' ) }
                        value={ titlePosition }
                        options={ [
                            { label: __( 'Left', 'buba-blocks' ), value: 'left' },
                            { label: __( 'Right', 'buba-blocks' ), value: 'right' },
                            { label: __( 'Center', 'buba-blocks' ), value: 'center' },
                        ] }
                        onChange={ titlePosition => setAttributes({titlePosition}) }
                    />
                    <SelectControl
                        label={ __( 'Title margin bottom:', 'buba-blocks' ) }
                        value={ titleMarginBottom }
                        options={ [
                            { label: __( 'Small', 'buba-blocks' ), value: '10px' },
                            { label: __( 'Medium', 'buba-blocks' ), value: '25px' },
                            { label: __( 'Large', 'buba-blocks' ), value: '40px' },
                        ] }
                        onChange={ titleMarginBottom => setAttributes({titleMarginBottom}) }
                    />
                    <SelectControl
                        label={ __( 'Title padding bottom:', 'buba-blocks' ) }
                        value={ titlePaddingBottom }
                        options={ [
                            { label: __( 'None', 'buba-blocks' ), value: '0' },
                            { label: __( 'Small', 'buba-blocks' ), value: '10px' },
                            { label: __( 'Medium', 'buba-blocks' ), value: '15px' },
                            { label: __( 'Large', 'buba-blocks' ), value: '20px' },
                        ] }
                        onChange={ titlePaddingBottom => setAttributes({titlePaddingBottom}) }
                    />
                    <ToggleControl
                        label={ __( 'Title decoration line', 'buba-blocks' ) }
                        checked={ titleDecoration }
                        onChange={ ( titleDecoration ) =>
                            setAttributes( { titleDecoration } )
                        }
                    />
                    {settingLine}
                </PanelBody>
                <PanelBody title={__('Text settings', 'buba-blocks')} initialOpen={ false }>
                    <SelectControl
                        label={ __( 'Text position:', 'buba-blocks' ) }
                        value={ textPosition }
                        options={ [
                            { label: __( 'Left', 'buba-blocks' ), value: 'left' },
                            { label: __( 'Right', 'buba-blocks' ), value: 'right' },
                            { label: __( 'Center', 'buba-blocks' ), value: 'center' },
                        ] }
                        onChange={ textPosition => setAttributes({textPosition}) }
                    />
                    <SelectControl
                        label={ __( 'Text size:', 'buba-blocks' ) }
                        value={ textSize }
                        options={ [
                            { label: __( 'Small', 'buba-blocks' ), value: '14px' },
                            { label: __( 'Normal', 'buba-blocks' ), value: '16px' },
                            { label: __( 'Medium', 'buba-blocks' ), value: '18px' },
                            { label: __( 'Large', 'buba-blocks' ), value: '20px' },
                            { label: __( 'Extra-large', 'buba-blocks' ), value: '24px' },
                        ] }
                        onChange={ textSize => setAttributes({textSize}) }
                    />
                </PanelBody>
            </InspectorControls>
            <div { ...blockProps }>
                <RenderHeader 
                    attributes={ attributes }
                />
                <div 
                    className={`wp-block-info-box__title-wrapper wp-block-info-box__title-wrapper--position_${titlePosition}`}
                    style={{
                        marginBottom: titleMarginBottom,
                        paddingBottom: titlePaddingBottom
                    }}
                >
                    <RichText
                        key="editable"
                        tagName={ titleTag }
                        value={ title }
                        placeholder={ _x('Title…', 'title placeholder') }
                        onChange={ ( title ) => setAttributes( { title } ) }
                        className="wp-block-info-box__title"
                    />
                    {renderLine}
                </div>
                <RichText
                    key="editable"
                    tagName="p"
                    value={ text }
                    placeholder={ _x('Content…', 'content placeholder') }
                    onChange={ ( text ) => setAttributes( { text } ) }
                    className="wp-block-info-box__text"
                    style={{
                        fontSize: textSize,
                        textAlign: textPosition,
                    }}
                />
            </div>
        </>
    );
}

export default InfoBoxEdit;