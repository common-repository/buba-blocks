/**
 * WordPress dependencies
 */
import {RichText, useBlockProps} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
    LINK_DESTINATION_ATTACHMENT,
    LINK_DESTINATION_MEDIA,
} from './constants';
import classnames from 'classnames';

export default function save({attributes}) {
    const {
        images,
        imageCrop,
        caption,
        linkTo,
        sliderSetting
    } = attributes;

    return (
        <>
            <div {...useBlockProps.save({
                className: classnames('buba-blocks-slider-images', {
                    'is-cropped' : imageCrop,
                }),
                'data-slick': JSON.stringify(sliderSetting),
                style: {
                    '--gap': sliderSetting?.gap
                }
            })}>
                {images.map((image) => {
                    let href;

                    switch (linkTo) {
                        case LINK_DESTINATION_MEDIA:
                            href = image.fullUrl || image.url;
                            break;
                        case LINK_DESTINATION_ATTACHMENT:
                            href = image.link;
                            break;
                    }

                    const img = (
                        <img
                            src={image.url}
                            alt={image.alt}
                            data-id={image.id}
                            data-full-url={image.fullUrl}
                            data-link={image.link}
                            className={
                                image.id ? `wp-image-${image.id}` : null
                            }
                        />
                    );

                    return (
                        <div
                            key={image.id || image.url}
                            className="buba-blocks-slider-images-item"
                        >
                            <figure>
                                {href ? <a href={href}>{img}</a> : img}
                                {!RichText.isEmpty(image.caption) && (
                                    <RichText.Content
                                        tagName="figcaption"
                                        className="buba-blocks-slider-images-item__caption"
                                        value={image.caption}
                                    />
                                )}
                            </figure>
                        </div>
                    );
                })}
            </div>
            {!RichText.isEmpty(caption) && (
                <RichText.Content
                    tagName="figcaption"
                    className="buba-blocks-slider-images-caption"
                    value={caption}
                />
            )}
        </>
    );
}