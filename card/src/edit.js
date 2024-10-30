/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import {__, _x} from '@wordpress/i18n';
import {useSelect} from '@wordpress/data';
import {
    BlockControls,
    InnerBlocks,
    InspectorControls,
    useBlockProps,
    __experimentalImageURLInputUI as ImageURLInputUI,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextareaControl,
    ToggleControl,
    ToolbarGroup,
    ExternalLink,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import MediaContainer from './media-container';

/**
 * Constants
 */
const TEMPLATE = [
    [
        'core/heading',
        {
            fontSize: 'large',
            placeholder: _x('Title…', 'title placeholder'),
        },
    ],
    [
        'core/paragraph',
        {
            fontSize: 'normal',
            placeholder: _x('Content…', 'content placeholder'),
        },
    ],
];
// this limits the resize to a safe zone to avoid making broken layouts
const WIDTH_CONSTRAINT_PERCENTAGE = 15;
const applyWidthConstraints = (width) =>
    Math.max(
        WIDTH_CONSTRAINT_PERCENTAGE,
        Math.min(width, 100 - WIDTH_CONSTRAINT_PERCENTAGE)
    );

const LINK_DESTINATION_MEDIA = 'media';
const LINK_DESTINATION_ATTACHMENT = 'attachment';

function attributesFromMedia({
                                 attributes: {linkDestination, href},
                                 setAttributes,
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

        let newHref = href;
        if (linkDestination === LINK_DESTINATION_MEDIA) {
            // Update the media link.
            newHref = media.url;
        }

        // Check if the image is linked to the attachment page.
        if (linkDestination === LINK_DESTINATION_ATTACHMENT) {
            // Update the media link.
            newHref = media.link;
        }

        setAttributes({
            mediaAlt: media.alt,
            mediaId: media.id,
            mediaType,
            mediaUrl: src || media.url,
            mediaLink: media.link || undefined,
            href: newHref,
        });
    };
}

function CardEdit({attributes, isSelected, setAttributes}) {
    const {
        href,
        isStackedOnMobile,
        linkClass,
        linkDestination,
        linkTarget,
        mediaAlt,
        mediaId,
        mediaType,
        mediaUrl,
        mediaWidth,
        rel,
        height,
    } = attributes;

    const image = useSelect(
        (select) =>
            mediaId && isSelected ? select('core').getMedia(mediaId) : null,
        [isSelected, mediaId]
    );


    const onSelectMedia = attributesFromMedia({attributes, setAttributes});

    const onSetHref = (props) => {
        setAttributes(props);
    };
    const classNames = classnames({
        'is-selected': isSelected,
        'is-stacked-on-mobile': isStackedOnMobile,
    });
    const onMediaAltChange = (newMediaAlt) => {
        setAttributes({mediaAlt: newMediaAlt});
    };
    const mediaTextGeneralSettings = (
        <PanelBody title={__('Media & Text settings', 'buba-blocks')}>
            <ToggleControl
                label={__('Stack on mobile', 'buba-blocks')}
                checked={isStackedOnMobile}
                onChange={() =>
                    setAttributes({
                        isStackedOnMobile: !isStackedOnMobile,
                    })
                }
            />
            {mediaType === 'image' && (
                <Fragment>
                    <TextareaControl
                        label={__('Alt text (alternative text)', 'buba-blocks')}
                        value={mediaAlt}
                        onChange={onMediaAltChange}
                        help={
                            <>
                                <ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
                                    {__('Describe the purpose of the image', 'buba-blocks')}
                                </ExternalLink>
                                {__(
                                    'Leave empty if the image is purely decorative.', 'buba-blocks'
                                )}
                            </>
                        }
                    />
                    <NumberControl
                        isShiftStepEnabled={ true }
                        onChange={ (value) => setAttributes({height: parseInt(value)}) }
                        shiftStep={ 1 }
                        label={__('Height(px)', 'buba-blocks')}
                        value={ height }
                    />
                </Fragment>
            )}
        </PanelBody>
    );
    const blockProps = useBlockProps( {
        className: classNames,
    } );
    return (
        <>
            <InspectorControls>
                {mediaTextGeneralSettings}
            </InspectorControls>
            <BlockControls>
                {mediaType === 'image' && (
                    <ToolbarGroup>
                        <ImageURLInputUI
                            url={href || ''}
                            onChangeUrl={onSetHref}
                            linkDestination={linkDestination}
                            mediaType={mediaType}
                            mediaUrl={image && image.source_url}
                            mediaLink={image && image.link}
                            linkTarget={linkTarget}
                            linkClass={linkClass}
                            rel={rel}
                        />
                    </ToolbarGroup>
                )}
            </BlockControls>
            <div { ...blockProps }>
                <MediaContainer
                    className="wp-block-card__media"
                    onSelectMedia={onSelectMedia}
                    {...{
                        isSelected,
                        isStackedOnMobile,
                        mediaAlt,
                        mediaId,
                        mediaType,
                        mediaUrl,
                        mediaWidth,
                        height,
                    }}
                    setAttributes={setAttributes}
                />
                <InnerBlocks
                    __experimentalTagName="div"
                    __experimentalPassedProps={{
                        className: 'wp-block-card__content',
                    }}
                    template={TEMPLATE}
                    templateInsertUpdatesSelection={false}
                />
            </div>
        </>
    );
}

export default CardEdit;