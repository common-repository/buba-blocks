/**
 * External dependencies
 */
import classnames from 'classnames';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';


/**
 * Internal dependencies
 */
import * as iconDefs from '../../assets/icons';
import socialLinks from "../../assets/socialLinks";
import defaultColors from "../../assets/defaultColors";
/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {
    useBlockProps, InspectorControls, URLPopover, URLInput, MediaUpload, MediaUploadCheck, MediaReplaceFlow
} from '@wordpress/block-editor';
import {Fragment, useCallback, useState} from '@wordpress/element';
import {keyboardReturn} from '@wordpress/icons';

import {useEffect} from '@wordpress/element';


import {
    PanelBody,
    SelectControl, Button, ColorIndicator, ColorPalette, PanelRow, ToggleControl
} from '@wordpress/components';
import stringToSlug from "../../assets/stringToSlug";


function EditSocialShareChild({attributes, setAttributes, context}) {
    const {
        icon,
        typeIcon,
        typeShareLink,
        iconColor,
        iconBackground,
        customLink,
        mediaId,
        mediaUrl,
        iconSize,
        iconBorderRadius,
        iconGap,
    } = attributes;

    const {size, borderRadius, gap, iconWidth, isSimilarWidth} = context;

    useEffect(() => {

        setAttributes({
            iconSize: size,
            iconBorderRadius: borderRadius,
            iconGap: gap,
            iconWidth: iconWidth,
            isSimilarWidth: isSimilarWidth
        });

    }, [size, iconSize, borderRadius, gap, iconWidth, isSimilarWidth]);

    const typeIcons = [
        {value: "icon", label: __("Icon", 'buba-blocks')},
        {value: "image", label: __("Image", 'buba-blocks')},
    ]

    const shareLinks = {
        facebook: "https://www.facebook.com/sharer.php?u=",
        twitter: "https://twitter.com/share?url=",
        google: "https://plus.google.com/share?url=",
        linkedin: "https://www.linkedin.com/shareArticle?url=",
        digg: "http://digg.com/submit?url=",
        blogger: "https://www.blogger.com/blog_this.pyra?t&amp;u=",
        reddit: "https://reddit.com/submit?url=",
        stumbleupon: "https://www.stumbleupon.com/submit?url=",
        tumblr: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=",
        myspace: "https://myspace.com/post?u=",
        email: "mailto:?body=",
        pinterest: "https://pinterest.com/pin/create/link/?url=",
        vk: 'https://vkontakte.ru/share.php?url=',
        odnoklassniki: 'https://connect.ok.ru/offer?url=',
        pocket: 'https://getpocket.com/edit?url=',
        whatsapp: 'https://api.whatsapp.com/send?text=', // whatsapp://send?text=*{title}*\n{text}\n{url}',//https://api.whatsapp.com/send?text=textToshare
        xing: 'https://www.xing.com/app/user?op=share&url=',
        telegram: 'https://telegram.me/share/url?url=',
        skype: 'https://web.skype.com/share?url=',
        buffer: 'https://buffer.com/add?url='
    };

    const className = classnames('buba-social-share__item', {});

    const styleLi = {
        marginRight: gap ? gap + 'px' : undefined
    }

    const classNameLink = classnames(size, 'buba-social-share__item-link', {
        'buba-is-image-icon': typeIcon === 'image',
        'buba-is-icon': typeIcon === 'icon',
    });
    const blockProps = useBlockProps({
        className,
        style: styleLi
    });

    const initialIcon = icon;

    const setIcon = useCallback(
        (newIcon) => {
            if (newIcon === undefined)
                setAttributes({
                    icon: initialIcon,
                });
            else setAttributes({icon: newIcon});
        },
        [setAttributes]
    );
    const oldTypeShareLink = typeShareLink;
    const setTypeShareLink = (typeShareLink) => {
        if (typeShareLink !== oldTypeShareLink) {
            switch (typeShareLink) {
                case 'twitter':
                    setAttributes({
                        icon: 57709
                    })
                    break;
                case 'google':
                    setAttributes({
                        icon: 57700
                    })
                    break;
                case 'pinterest':
                    setAttributes({
                        icon: 57766
                    })
                    break;
                case 'linkedin':
                    setAttributes({
                        icon: 57759
                    })
                    break;
                case 'blogger':
                    setAttributes({
                        icon: 57744
                    })
                    break;
                case 'reddit':
                    setAttributes({
                        icon: 57758
                    })
                    break;
                case 'stumbleupon':
                    setAttributes({
                        icon: 57763
                    })
                    break;
                case 'tumblr':
                    setAttributes({
                        icon: 57747
                    })
                    break;
                case 'email':
                    setAttributes({
                        icon: 57695
                    })
                    break;
                case 'skype':
                    setAttributes({
                        icon: 57757
                    })
                    break;
                case 'xing':
                    setAttributes({
                        icon: 57768
                    })
                    break;
                case 'facebook':
                    setAttributes({
                        icon: 57759
                    })
                    break;
                default:
                    break;
            }
            setAttributes({
                typeShareLink
            })
        }
    }

    const [showURLPopover, setPopover] = useState(false);

    const styles = {
        backgroundColor: iconBackground ? iconBackground : undefined,
        color: iconColor ? iconColor : undefined,
        borderRadius: borderRadius ? borderRadius + 'px' : undefined,
        width: isSimilarWidth ? 'calc('+iconSize+'px * var(--global--line-height-body))' : iconWidth + 'px',
        fontSize: iconSize ? iconSize + 'px' : undefined
    }

    const ALLOWED_MEDIA_TYPES = ['image'];

    const setMedia = (media) => {
        if (!media || !media.url) {
            setAttributes({mediaUrl: undefined, mediaId: undefined});
            return;
        }
        setAttributes({
            mediaUrl: media.url,
            mediaId: media.id,
        });
    }
    const deleteImage = () => {
        setAttributes({mediaUrl: undefined, mediaId: undefined});
    }

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Icon setting', 'buba-blocks')} className="buba-social-share__settings">
                    <SelectControl
                        label={__('Type Share link', 'buba-blocks')}
                        value={typeShareLink}
                        onChange={setTypeShareLink}
                        options={socialLinks}
                    />
                    <SelectControl
                        label={__('Image / Icon', 'buba-blocks')}
                        value={typeIcon}
                        onChange={(typeIcon) => {
                            setAttributes({
                                typeIcon
                            })
                        }}
                        options={typeIcons}
                    />
                    {typeIcon === 'icon' && (
                        <FontIconPicker
                            theme={'default'}
                            icons={iconDefs.icomoonIcons}
                            search={iconDefs.icomoonIconsSearch}
                            renderUsing="data-icomoon"
                            isMulti={false}
                            closeOnSelect={true}
                            appendTo="body"
                            value={icon}
                            onChange={setIcon}
                        />
                    )}
                    {typeIcon === 'image' && !mediaUrl && (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={setMedia}
                                allowedTypes={ALLOWED_MEDIA_TYPES}
                                value={mediaId}
                                render={({open}) => (
                                    <Button isSecondary onClick={open}>
                                        Open Media Library
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    )}
                    {typeIcon === 'image' && mediaUrl && mediaId && (
                        <PanelRow>
                            <MediaReplaceFlow
                                mediaId={ mediaId }
                                mediaURL={ mediaUrl }
                                allowedTypes={ ALLOWED_MEDIA_TYPES }
                                accept="image/*,video/*"
                                onSelect={ setMedia }
                                name={ ! mediaUrl ? __( 'Add Media', 'buba-blocks' ) : __( 'Replace image', 'buba-blocks' ) }
                            />
                            <Button isLink
                                    onClick={deleteImage}
                                    isDestructive
                                    className="buba-delete-image"
                            >
                                {__('Delete image', 'buba-blocks')}
                            </Button>
                        </PanelRow>
                    )}
                    <h2>{__('Icon color settings', 'buba-blocks')}</h2>
                    <p>{__('Background', 'buba-blocks')} {iconBackground && <ColorIndicator colorValue={iconBackground}/>}</p>
                    <ColorPalette
                        colors={defaultColors}
                        value={iconBackground}
                        onChange={(iconBackground) => {
                            setAttributes({
                                iconBackground
                            })
                        }}
                    />
                    <p>{__('Icon color', 'buba-blocks')} {iconColor && <ColorIndicator colorValue={iconColor}/>}</p>
                    <ColorPalette
                        colors={defaultColors}
                        value={iconColor}
                        onChange={(iconColor) => {
                            setAttributes({
                                iconColor
                            })
                        }}
                    />
                </PanelBody>
            </InspectorControls>
            <li {...blockProps}>
                <a className={classNameLink} onClick={(event) => {
                    event.preventDefault();
                    setPopover(true)
                }}
                   style={styles}
                >
                    {typeIcon === 'icon' && (
                        <i
                            data-icomoon={String.fromCodePoint(
                                icon
                            )}
                        />
                    )}
                    {typeIcon === 'image' && mediaUrl && (
                        <img src={mediaUrl} alt={typeShareLink}/>
                    )}

                    {showURLPopover && (
                        <URLPopover onClose={() => setPopover(false)}>
                            <form
                                className="block-editor-url-popover__link-editor"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    setPopover(false);
                                }}
                            >
                                <div className="block-editor-url-input">
                                    <URLInput
                                        value={customLink}
                                        onChange={(nextURL) =>
                                            setAttributes({customLink: nextURL})
                                        }
                                        placeholder={__('Enter address', 'buba-blocks')}
                                        disableSuggestions={true}
                                    />
                                </div>
                                <Button
                                    icon={keyboardReturn}
                                    label={__('Apply', 'buba-blocks')}
                                    type="submit"
                                />
                            </form>
                        </URLPopover>
                    )}
                </a>
            </li>
        </Fragment>
    )
}

export default EditSocialShareChild;