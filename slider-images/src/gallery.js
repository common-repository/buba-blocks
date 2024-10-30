/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {RichText, useBlockProps} from '@wordpress/block-editor';
import {VisuallyHidden} from '@wordpress/components';
import {__, sprintf} from '@wordpress/i18n';
import {createBlock} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import GalleryImage from './gallery-image';
import {Slider} from '../../components/slider-edit';

export const Gallery = (props) => {
    const {
        attributes,
        className,
        isSelected,
        setAttributes,
        selectedImage,
        mediaPlaceholder,
        onMoveBackward,
        onMoveForward,
        onRemoveImage,
        onSelectImage,
        onDeselectImage,
        onSetImageAttributes,
        onFocusGalleryCaption,
        insertBlocksAfter,
    } = props;

    const {
        align,
        caption,
        imageCrop,
        images,
        slidesToShow,
        dots,
        infinite,
        arrows,
        autoplay,
        autoplaySpeed,
        slidesToScroll,
        speed,
        fade,
        cssEase,
        sliderSetting
    } = attributes;
    const settings = {
        dots,
        infinite,
        arrows,
        autoplay,
        autoplaySpeed,
        speed,
        slidesToShow,
        slidesToScroll,
        fade,
        cssEase
    };

    const blockProps = useBlockProps({
        className: classnames({
            [`align${align}`]: align,
        })
    });

    return (
        <div {...blockProps}>
            <Slider 
                className={classnames(className, {
                    'is-cropped': imageCrop,
                })}
                setting={sliderSetting}
            >
                {images.map((img, index) => {
                    const ariaLabel = sprintf(
                        /* translators: 1: the order number of the image. 2: the total number of images. */
                        __('image %1$d of %2$d in gallery', 'buba-blocks'),
                        index + 1,
                        images.length
                    );

                    return (
                        <div
                            className="buba-blocks-slider-images-item"
                            key={img.id || img.url}
                        >
                            <GalleryImage
                                url={img.url}
                                alt={img.alt}
                                id={img.id}
                                isFirstItem={index === 0}
                                isLastItem={index + 1 === images.length}
                                isSelected={
                                    isSelected && selectedImage === index
                                }
                                onMoveBackward={onMoveBackward(index)}
                                onMoveForward={onMoveForward(index)}
                                onRemove={onRemoveImage(index)}
                                onSelect={onSelectImage(index)}
                                onDeselect={onDeselectImage(index)}
                                setAttributes={(attrs) =>
                                    onSetImageAttributes(index, attrs)
                                }
                                caption={img.caption}
                                aria-label={ariaLabel}
                                sizeSlug={attributes.sizeSlug}
                            />
                        </div>
                    );
                })}
            </Slider>
            {mediaPlaceholder}
            <RichTextVisibilityHelper
                isHidden={!isSelected && RichText.isEmpty(caption)}
                tagName="figcaption"
                className="buba-blocks-slider-images-caption"
                placeholder={__('Write gallery caption…', 'buba-blocks')}
                value={caption}
                unstableOnFocus={onFocusGalleryCaption}
                onChange={(value) => setAttributes({caption: value})}
                inlineToolbar
                __unstableOnSplitAtEnd={() =>
                    insertBlocksAfter(createBlock('core/paragraph'))
                }
            />
        </div>
    );
};

function RichTextVisibilityHelper({isHidden, ...richTextProps}) {
    return isHidden ? (
        <VisuallyHidden as={RichText} {...richTextProps} />
    ) : (
        <RichText {...richTextProps} />
    );
}

export default Gallery;