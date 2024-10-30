/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    InnerBlocks,
    BlockControls,
    BlockVerticalAlignmentToolbar,
    MediaPlaceholder,
    BlockIcon,
    MediaUploadCheck,
    MediaUpload,
    InspectorControls,
    useBlockProps,
    __experimentalUseGradient,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ButtonGroup,
    TabPanel,
    Button,
    BaseControl,
    Popover,
    RadioControl,
    CheckboxControl,
    SelectControl,
    FocalPointPicker,
    withNotices,
    __experimentalInputControl as InputControl,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';
import {useSelect, useDispatch} from '@wordpress/data';
import {useEffect, useState} from '@wordpress/element';
import {__, _x} from '@wordpress/i18n';
import {image} from '@wordpress/icons';
import spacings from "../../assets/spacings";
import ColorEdit from "./color-edit";


const ALLOWED_MEDIA_TYPES = ['image'];




function attributesFromMedia({
                                 attributes,
                                 setAttributes,
                                 toggleIsPressed,
                             }) {
    return (media) => {
        let mediaType;
        let src;

        // for media selections originated from a file upload.
        if (media.media_type) {
            if (media.media_type === 'image') {
                mediaType = 'image';
            } else {
                // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
                // video contain the media type of 'file' in the object returned from the rest api.
                mediaType = 'video';
            }
        } else {
            // for media selections originated from existing files in the media library.
            mediaType = media.type;
        }

        if (mediaType === 'image') {
            // Try the "large" size URL, falling back to the "full" size URL below.
            src =
                media.sizes?.large?.url ||
                // eslint-disable-next-line camelcase
                media.media_details?.sizes?.large?.source_url;
        }

        setAttributes({
            mediaId: media.id,
            mediaType,
            mediaUrl: media.url,
        });
        toggleIsPressed(false);

    };
}

function SelectControlSpacing({obj, oldObj, oldPartObj, name, setAttributes}) {
    const arr = name.split('.');
    const setSpacing = (value) => {
        setAttributes({
                spacing: {
                    ...oldObj,
                    [arr[0]]: {
                        ...oldPartObj,
                        [arr[1]]: {
                            ...obj,
                            typeSpacing: value,
                        }
                    }
                }
            }
        )
    }
    const setSpacingNumber = (value) => {
        setAttributes({
                spacing: {
                    ...oldObj,
                    [arr[0]]: {
                        ...oldPartObj,
                        [arr[1]]: {
                            ...obj,
                            number: value,
                        }
                    }
                }
            }
        )
    }
    return <div>
        <SelectControl
            label={[obj.label]}
            value={obj.typeSpacing}
            onChange={setSpacing}
            options={spacings}
        />
        {obj.typeSpacing === 'custom' && (
            <InputControl
                label={__('Value (px):', 'buba-blocks')}
                type={'number'}
                value={obj.number}
                onChange={setSpacingNumber}
            />
        )}
    </div>

}

function ContainerTabPanels({attributes, setAttributes, clientId, toggleIsPressed}) {

    const {
        width,
        spacing,
    } = attributes;

    const setWidth = (nextWidth) => {
        setAttributes({width: nextWidth});
    }

    return (
        <TabPanel className="my-tab-panel"
                  activeClass="active-tab"
                  tabs={[
                      {
                          name: 'general',
                          title: __('General', 'buba-blocks'),
                          className: 'general-tab',
                      },
                      {
                          name: 'style',
                          title: __('Style', 'buba-blocks'),
                          className: 'style-tab',
                      },
                  ]}>
            {
                (tab) =>
                    <div>
                        {tab.name === 'general' && (
                            <Fragment>
                                <RangeControl
                                    label={__('Max container inside width (px)', 'buba-blocks')}
                                    value={width || ''}
                                    onChange={setWidth}
                                    min={0}
                                    max={2000}
                                    step={10}
                                    required
                                    allowReset
                                    placeholder={
                                        width === undefined ? __('Auto', 'buba-blocks') : undefined
                                    }
                                />
                            </Fragment>
                        )}
                        {tab.name === 'style' && (
                            <Fragment>
                                <PanelBody title={__('Background', 'buba-blocks')}>
                                    <BackgroundImageSettings
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                        toggleIsPressed={toggleIsPressed}
                                    />

                                </PanelBody>
                                <ColorEdit
                                    attributes={attributes}
                                    setAttributes={setAttributes}
                                />
                                <PanelBody title={__('Padding', 'buba-blocks')} initialOpen={false}>
                                    {
                                        Object.keys(spacing.padding).map((item, i) => (
                                            <SelectControlSpacing
                                                key={i}
                                                name={'padding.' + item}
                                                obj={spacing.padding[item]}
                                                oldObj={spacing}
                                                oldPartObj={spacing.padding}
                                                setAttributes={setAttributes}
                                            />
                                        ))
                                    }
                                </PanelBody>
                                <PanelBody title={__('Margin', 'buba-blocks')} initialOpen={false}>
                                    {
                                        Object.keys(spacing.margin).map((item, i) => (
                                            <SelectControlSpacing
                                                key={i}
                                                name={'margin.' + item}
                                                obj={spacing.margin[item]}
                                                oldObj={spacing}
                                                oldPartObj={spacing.margin}
                                                setAttributes={setAttributes}
                                            />
                                        ))
                                    }
                                </PanelBody>
                            </Fragment>

                        )}
                    </div>
            }
        </TabPanel>
    )

}

function BackgroundImageSettings({attributes, setAttributes, toggleIsPressed}) {
    const {
        mediaUrl,
        noticeUI,
        noticeOperations,
        mediaId,
        backgroundSize,
        backgroundPosition,
        focalPoint,
        backgroundAttachment,
        backgroundRepeat,
    } = attributes;
    const onSelectMedia = attributesFromMedia({attributes, setAttributes, toggleIsPressed});

    const onUploadError = (message) => {
        noticeOperations.removeAllNotices();
        noticeOperations.createErrorNotice(message);
    };

    return <Fragment>
        {mediaUrl && (
            <div>
                <BaseControl
                    label={__('Background image', 'buba-blocks')}
                >
                    <img src={mediaUrl}/>
                </BaseControl>
                <ButtonGroup>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectMedia}
                            allowedTypes={ALLOWED_MEDIA_TYPES}
                            value={mediaId}
                            render={({open}) => (
                                <Button isPrimary onClick={open}>
                                    {__('Replace image', 'buba-blocks')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    <Button onClick={() => setAttributes({mediaUrl: undefined})}>{__('Remove image', 'buba-blocks')}</Button>
                </ButtonGroup>
                <SelectControl
                    label={__('Background Position', 'buba-blocks')}
                    value={backgroundPosition}
                    onChange={(newBackgroundPosition) => {
                        setAttributes({backgroundPosition: newBackgroundPosition})
                    }}
                    options={[
                        {value: '', label: 'Default'},
                        {value: 'custom', label: 'Custom'},
                        {value: 'top left', label: 'Top Left'},
                        {value: 'top center', label: 'Top Center'},
                        {value: 'top right', label: 'Top Right'},
                        {value: 'center left', label: 'Center Left'},
                        {value: 'center center', label: 'Center Center'},
                        {value: 'center right', label: 'Center Right'},
                        {value: 'bottom left', label: 'Bottom Left'},
                        {value: 'bottom center', label: 'Bottom Center'},
                        {value: 'bottom right', label: 'Bottom Right'},
                    ]}
                />
                {backgroundPosition === 'custom' && mediaUrl && (
                    <BaseControl>
                        <FocalPointPicker
                            url={mediaUrl}
                            value={focalPoint}
                            onChange={(value) => setAttributes({focalPoint: value})}
                        />
                    </BaseControl>
                )}
                <SelectControl
                    label={__('Background Size', 'buba-blocks')}
                    value={backgroundSize}
                    onChange={(newSize) => {
                        setAttributes({backgroundSize: newSize})
                    }}
                    options={[
                        {value: 'cover', label: 'Cover'},
                        {value: 'contain', label: 'Contain'},
                        {value: 'auto', label: 'Auto'},
                    ]}
                />
                <SelectControl
                    label={__('Background Attachment', 'buba-blocks')}
                    value={backgroundAttachment}
                    onChange={(value) => {
                        setAttributes({backgroundAttachment: value})
                    }}
                    options={[
                        {value: '', label: 'Default'},
                        {value: 'scroll', label: 'Scroll'},
                        {value: 'fixed', label: 'Fixed'},
                    ]}
                />
                <SelectControl
                    label={__('Background Repeat', 'buba-blocks')}
                    value={backgroundRepeat}
                    onChange={(value) => {
                        setAttributes({backgroundRepeat: value})
                    }}
                    options={[
                        {value: '', label: 'Default'},
                        {value: 'no-repeat', label: 'No Repeat'},
                        {value: 'repeat', label: 'Repeat'},
                        {value: 'repeat-x', label: 'Repeat X'},
                        {value: 'repeat-y', label: 'Repeat Y'},
                        {value: 'space', label: 'Space'},
                        {value: 'round', label: 'Round'},
                    ]}
                />
            </div>
        )}
        {!mediaUrl && (
            <MediaPlaceholder
                icon={<BlockIcon icon={image}/>}
                labels={{
                    title: __('Background image', 'buba-blocks'),
                }}
                onSelect={onSelectMedia}
                accept="image/*,video/*"
                allowedTypes={ALLOWED_MEDIA_TYPES}
                notices={noticeUI}
                onError={onUploadError}
            />
        )}
    </Fragment>
}


function ContainerEdit({attributes, setAttributes, clientId}) {
    const {
        verticalAlignment,
        width,
        spacing,
        mediaUrl,
        backgroundSize,
        backgroundPosition,
        backgroundRepeat,
        focalPoint,
        backgroundAttachment,
        overlayColor,
        customOverlayColor,
        gradient,
        customGradient,
        dimRatio,
    } = attributes;
    const {
        gradientClass,
        gradientValue,
        setGradient,
    } = __experimentalUseGradient();

    function dimRatioToClass(ratio) {
        return ratio === 0 || ratio === 50 || !ratio
            ? null
            : 'buba-has-background-dim-' + 10 * Math.round(ratio / 10);
    }

    //console.log(classes);

    const {hasChildBlocks, rootClientId} = useSelect(
        (select) => {
            const {getBlockOrder, getBlockRootClientId} = select(
                'core/block-editor'
            );

            return {
                hasChildBlocks: getBlockOrder(clientId).length > 0,
                rootClientId: getBlockRootClientId(clientId),
            };
        },
        [clientId]
    );


    const {updateBlockAttributes} = useDispatch('core/block-editor');
    const updateAlignment = (value) => {
        // Update own alignment.
        setAttributes({verticalAlignment: value});
        // Reset parent Columns block.
        updateBlockAttributes(rootClientId, {
            verticalAlignment: null,
        });
    };

    const hasWidth = Number.isFinite(width);

    const [isPressed, setPressed] = useState(false);
    const toggleIsPressed = (e) => {
        setPressed(!isPressed);
    }

    const blockProps = useBlockProps({
        className: classnames('block-core-container', dimRatioToClass(dimRatio), {
            [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
            [`buba-padding-top-${spacing.padding.top.typeSpacing}`]: spacing.padding.top.typeSpacing,
            [`buba-padding-right-${spacing.padding.right.typeSpacing}`]: spacing.padding.right.typeSpacing,
            [`buba-padding-bottom-${spacing.padding.bottom.typeSpacing}`]: spacing.padding.bottom.typeSpacing,
            [`buba-padding-left-${spacing.padding.left.typeSpacing}`]: spacing.padding.left.typeSpacing,
            [`buba-margin-top-${spacing.margin.top.typeSpacing}`]: spacing.margin.top.typeSpacing,
            [`buba-margin-bottom-${spacing.margin.bottom.typeSpacing}`]: spacing.margin.bottom.typeSpacing,
            'buba-has-background-dim': (overlayColor && dimRatio !== 0) || customOverlayColor || gradient || customGradient,
    
        }),
        style: {
            maxWidth: width ? width : undefined,
            paddingTop: spacing.padding.top.typeSpacing === 'custom' ? spacing.padding.top.number + 'px' : undefined,
            paddingRight: spacing.padding.right.typeSpacing === 'custom' ? spacing.padding.right.number + 'px' : undefined,
            paddingBottom: spacing.padding.bottom.typeSpacing === 'custom' ? spacing.padding.bottom.number + 'px' : undefined,
            paddingLeft: spacing.padding.left.typeSpacing === 'custom' ? spacing.padding.left.number + 'px' : undefined,
            marginTop: spacing.margin.top.typeSpacing === 'custom' ? spacing.margin.top.number + 'px' : undefined,
            marginBottom: spacing.margin.bottom.typeSpacing === 'custom' ? spacing.margin.bottom.number + 'px' : undefined,
            backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined,
            backgroundSize: backgroundSize ? backgroundSize : undefined,
            backgroundPosition: backgroundPosition==='custom' ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : backgroundPosition && mediaUrl ? backgroundPosition : undefined,
            backgroundAttachment: backgroundAttachment ? backgroundAttachment : undefined,
            backgroundRepeat: backgroundRepeat ? backgroundRepeat : undefined,
            backgroundColor: overlayColor ? overlayColor : undefined,
        }
    });

    return (
        <>
            <BlockControls>
                <BlockVerticalAlignmentToolbar
                    onChange={updateAlignment}
                    value={verticalAlignment}
                />
                <Button style={{height:100+'%'}} onClick={toggleIsPressed} isPressed={isPressed} showTooltip shortcut={__('Image', 'buba-blocks')}
                        icon={image}/>
                {
                    isPressed && (
                        <Popover className="image-popover">
                            <BackgroundImageSettings
                                attributes={attributes}
                                setAttributes={setAttributes}
                                toggleIsPressed={toggleIsPressed}
                            />
                        </Popover>
                    )
                }
            </BlockControls>
            <InspectorControls>
                <ContainerTabPanels
                    setAttributes={setAttributes}
                    attributes={attributes}
                    clientId={clientId}
                    toggleIsPressed={toggleIsPressed}
                />
            </InspectorControls>
            <div {...blockProps}>
                {gradientValue && dimRatio !== 0 && (
                    <span
                        aria-hidden="true"
                        className={ classnames(
                            'buba-container__gradient-background',
                            gradientClass
                        ) }
                        style={ { background: gradientValue } }
                    />
                ) }
                <InnerBlocks 
                    templateLock={false}
                    __experimentalTagName="div"
                    __experimentalPassedProps={{
                        className: classnames('buba-container-inside'),
                    }}
                />
            </div>
        </>
    );
}

export default withNotices(ContainerEdit);