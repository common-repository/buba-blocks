/**
 * External dependencies
 */
import classnames from 'classnames';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import {icomoonIcons, fontAwesome, icomoonIconsSearch} from '../../assets/icons';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {useCallback, useState, useEffect, useRef} from '@wordpress/element';
import {
    KeyboardShortcuts,
    PanelBody,
    RangeControl,
    TextControl,
    ToggleControl,
    Button,
    ButtonGroup,
    ToolbarButton,
    ToolbarGroup,
    Popover,
    SelectControl,
    __experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import {
    BlockControls,
    InspectorControls,
    RichText,
    useBlockProps,
    __experimentalUseColorProps as useColorProps,
    __experimentalLinkControl as LinkControl, BlockAlignmentToolbar
} from '@wordpress/block-editor';
import {rawShortcut, displayShortcut} from '@wordpress/keycodes';
import {link, linkOff} from '@wordpress/icons';
import {createBlock} from '@wordpress/blocks';
import {useSelect} from '@wordpress/data';

/**
 * Internal dependencies
 */
import ColorEdit from './color-edit';
import ColorControl from '../../components/color-control';

const NEW_TAB_REL = 'noreferrer noopener';
const MIN_BORDER_RADIUS_VALUE = 0;
const MAX_BORDER_RADIUS_VALUE = 50;
const INITIAL_BORDER_RADIUS_POSITION = 5;

function WidthPanel({selectedWidth, setAttributes}) {
    function handleChange(newWidth) {
        // Check if we are toggling the width off
        const width = selectedWidth === newWidth ? undefined : newWidth;

        // Update attributes
        setAttributes({width});
    }

    return (
        <PanelBody title={__('Width settings', 'buba-blocks')}>
            <ButtonGroup aria-label={__('Button width', 'buba-blocks')}>
                {[25, 50, 75, 100].map((widthValue) => {
                    return (
                        <Button
                            key={widthValue}
                            isSmall
                            isPrimary={widthValue === selectedWidth}
                            onClick={() => handleChange(widthValue)}
                        >
                            {widthValue}%
                        </Button>
                    );
                })}
            </ButtonGroup>
        </PanelBody>
    );
}

function BorderPanel({borderRadius = '', setAttributes}) {
    const initialBorderRadius = borderRadius;
    const setBorderRadius = useCallback(
        (newBorderRadius) => {
            if (newBorderRadius === undefined)
                setAttributes({
                    borderRadius: initialBorderRadius,
                });
            else setAttributes({borderRadius: newBorderRadius});
        },
        [setAttributes]
    );
    return (
        <PanelBody title={__('Border settings', 'buba-blocks')}>
            <RangeControl
                value={borderRadius}
                label={__('Border radius', 'buba-blocks')}
                min={MIN_BORDER_RADIUS_VALUE}
                max={MAX_BORDER_RADIUS_VALUE}
                initialPosition={INITIAL_BORDER_RADIUS_POSITION}
                allowReset
                onChange={setBorderRadius}
            />
        </PanelBody>
    );
}

function IconPicker({buttonIcon = '', setAttributes, icons, iconPosition}) {
    const initialButtonIcon = buttonIcon;
    const handleChange = useCallback(
        (newButtonIcon) => {
            if (newButtonIcon === undefined)
                setAttributes({
                    buttonIcon: initialButtonIcon,
                });
            else setAttributes({
                buttonIcon: newButtonIcon
            });
        },
        [setAttributes]
    );
    const props = {
        icons: icons,
        theme: 'default',
        renderUsing: 'class',
        isMulti: false,
        appendTo: 'body',
        value: buttonIcon,
        onChange: handleChange
    };
    return (
        <PanelBody title={__('Icon settings', 'buba-blocks')}>
            <FontIconPicker
                {...props}
            />
            <SelectControl
                value={iconPosition}
                label={__('Icon position', 'buba-blocks')}
                options={[
                    {label: 'Left', value: 'left'},
                    {label: 'Right', value: 'right'}
                ]}
                onChange={iconPosition => setAttributes({iconPosition})}
            />
        </PanelBody>
    )
}

function URLPicker({
                       isSelected,
                       url,
                       setAttributes,
                       opensInNewTab,
                       onToggleOpenInNewTab,
                   }) {
    const [isURLPickerOpen, setIsURLPickerOpen] = useState(false);
    const urlIsSet = !!url;
    const urlIsSetandSelected = urlIsSet && isSelected;
    const openLinkControl = () => {
        setIsURLPickerOpen(true);
        return false; // prevents default behaviour for event
    };
    const unlinkButton = () => {
        setAttributes({
            url: undefined,
            linkTarget: undefined,
            rel: undefined,
        });
        setIsURLPickerOpen(false);
    };
    const linkControl = (isURLPickerOpen || urlIsSetandSelected) && (
        <Popover
            position="bottom center"
            onClose={() => setIsURLPickerOpen(false)}
        >
            <LinkControl
                className="wp-block-navigation-link__inline-link-input"
                value={{url, opensInNewTab}}
                onChange={({
                               url: newURL = '',
                               opensInNewTab: newOpensInNewTab,
                           }) => {
                    setAttributes({url: newURL});

                    if (opensInNewTab !== newOpensInNewTab) {
                        onToggleOpenInNewTab(newOpensInNewTab);
                    }
                }}
            />
        </Popover>
    );
    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    {!urlIsSet && (
                        <ToolbarButton
                            name="link"
                            icon={link}
                            title={__('Link', 'buba-blocks')}
                            shortcut={displayShortcut.primary('k')}
                            onClick={openLinkControl}
                        />
                    )}
                    {urlIsSetandSelected && (
                        <ToolbarButton
                            name="link"
                            icon={linkOff}
                            title={__('Unlink', 'buba-blocks')}
                            shortcut={displayShortcut.primaryShift('k')}
                            onClick={unlinkButton}
                            isActive={true}
                        />
                    )}
                </ToolbarGroup>
            </BlockControls>
            {isSelected && (
                <KeyboardShortcuts
                    bindGlobal
                    shortcuts={{
                        [rawShortcut.primary('k')]: openLinkControl,
                        [rawShortcut.primaryShift('k')]: unlinkButton,
                    }}
                />
            )}
            {linkControl}
        </>
    );
}

function ButtonEdit(props) {
    const {
        attributes,
        className,
        setAttributes,
        isSelected,
        onReplace,
        mergeBlocks,
    } = props;
    const {
        borderRadius,
        linkTarget,
        placeholder,
        rel,
        text,
        url,
        buttonIcon,
        alignment,
        backgroundHover,
        textHover,
        duration,
        iconPosition,
        buttonPadding,
        width,
        isSubmit
    } = attributes;
    const onSetLinkRel = useCallback(
        (value) => {
            setAttributes({rel: value});
        },
        [setAttributes]
    );
    const {colors} = useSelect((select) => {
        return select('core/block-editor').getSettings();
    }, []);

    const onToggleOpenInNewTab = useCallback(
        (value) => {
            const newLinkTarget = value ? '_blank' : undefined;

            let updatedRel = rel;
            if (newLinkTarget && !rel) {
                updatedRel = NEW_TAB_REL;
            } else if (!newLinkTarget && rel === NEW_TAB_REL) {
                updatedRel = undefined;
            }

            setAttributes({
                linkTarget: newLinkTarget,
                rel: updatedRel,
            });
        },
        [rel, setAttributes]
    );

    const colorProps = useColorProps(attributes);
    const ref = useRef();
    const blockProps = useBlockProps({ref});
    useEffect(() => {
        if (props.attributes.text) {
            const setButtonIcon = buttonIcon ? '<i class="' + buttonIcon + ' icon-' + iconPosition + '"> </i>' : '';
            props.attributes.text = props.attributes.text.replace(/<i.*?<\/i>/g, '');
            setAttributes({
                text: iconPosition === 'left' ?
                    (setButtonIcon) + props.attributes.text
                    :
                    props.attributes.text + (setButtonIcon)
            });
        }

    }, [buttonIcon, iconPosition]);

    const onChangeAlignment = (newAlignment) => {
        setAttributes({
            alignment: newAlignment === undefined ? 'none' : newAlignment,
        });
    };

    return (
        <>
            <ColorEdit {...props} />
            <BlockControls>
                <BlockAlignmentToolbar
                    value={alignment}
                    onChange={onChangeAlignment}
                    controls={[
                        'left',
                        'center',
                        'right',
                    ]}
                />
            </BlockControls>
            <div
                {...blockProps}
                className={classnames(blockProps.className, {
                        [`has-custom-width wp-block-button__width-${width}`]: width,
                    },
                    alignment ? 'align-button-' + alignment : '',
                )}
            >
                <RichText
                    placeholder={placeholder || __('Add text…', 'buba-blocks')}
                    value={text}
                    tagName={ isSubmit ? 'button' : 'a' }
                    onChange={(value) => {
                        setAttributes({text: value});
                    }}
                    withoutInteractiveFormatting
                    className={classnames(
                        className,
                        'wp-block-button__link',
                        colorProps.className,
                        {
                            'no-border-radius': borderRadius === 0,
                        }
                    )}
                    style={{
                        borderRadius: borderRadius
                            ? borderRadius + 'px'
                            : undefined,
                        ...colorProps.style,
                        padding: buttonPadding.top + ' ' + buttonPadding.right + ' ' + buttonPadding.bottom + ' ' + buttonPadding.left,
                        ['--background-hover']: backgroundHover,
                        ['--text-hover']: textHover,
                        ['--transition-duration']: duration + 'ms'
                    }}
                    onSplit={(value) =>
                        createBlock('core/button', {
                            ...attributes,
                            text: value,
                        })
                    }
                    onReplace={onReplace}
                    onMerge={mergeBlocks}
                    onClick={ e => e.preventDefault() }
                    identifier="text"
                />
            </div>
            { !isSubmit &&
                <URLPicker
                    url={url}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                    opensInNewTab={linkTarget === '_blank'}
                    onToggleOpenInNewTab={onToggleOpenInNewTab}
                />
            }
            <InspectorControls>
                <PanelBody title={__('Hover settings', 'buba-blocks')} initialOpen={false}>
                    <div className="buba-blocks-side-box">
                        <ColorControl
                            label={__('Text:', 'buba-blocks')}
                            value={textHover}
                            onChange={textHover => setAttributes({textHover})}
                            gradientLock={ true }
                        />
                        <ColorControl
                            label={__('Background:', 'buba-blocks')}
                            value={ backgroundHover }
                            onChange={ backgroundHover => setAttributes({backgroundHover})}
                        />
                    </div>
                    <div className="buba-blocks-box-edit">
                        <RangeControl
                            label={__('Duration(ms):', 'buba-blocks')}
                            value={duration}
                            onChange={duration => setAttributes({duration})}
                            min={50}
                            max={10000}
                            step={50}
                        />
                    </div>
                </PanelBody>
                <PanelBody title={__('Submit', 'buba-blocks')} initialOpen={false}>
                    <ToggleControl 
                        label={ __( 'Set this parameter to submit the form', 'buba-blocks' ) }
                        checked={ isSubmit }
                        onChange={ isSubmit => setAttributes({ isSubmit }) }
                    />
                </PanelBody>
                <PanelBody title={__('Padding settings', 'buba-blocks')} initialOpen={false}>
                    <BoxControl
                        values={buttonPadding}
                        onChange={buttonPadding => setAttributes({buttonPadding})}
                    />
                </PanelBody>
                <WidthPanel
                    selectedWidth={width}
                    setAttributes={setAttributes}
                />
                <BorderPanel
                    borderRadius={borderRadius}
                    setAttributes={setAttributes}
                />
                <IconPicker
                    buttonIcon={buttonIcon}
                    setAttributes={setAttributes}
                    icons={fontAwesome}
                    iconPosition={iconPosition}
                />
                { !isSubmit &&
                    <PanelBody title={__('Link settings', 'buba-blocks')} initialOpen={false}>
                        <ToggleControl
                            label={__('Open in new tab', 'buba-blocks')}
                            onChange={onToggleOpenInNewTab}
                            checked={linkTarget === '_blank'}
                        />
                        <TextControl
                            label={__('Link rel', 'buba-blocks')}
                            value={rel || ''}
                            onChange={onSetLinkRel}
                        />
                    </PanelBody>
                }
            </InspectorControls>
        </>
    );
}

export default ButtonEdit;