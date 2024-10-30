/**
 * External dependencies
 */
import classnames from 'classnames';
import { noop, isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { InnerBlocks,useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

const DEFAULT_MEDIA_WIDTH = 100;

export default function save( { attributes } ) {
    const {
        isStackedOnMobile,
        mediaAlt,
        mediaType,
        mediaUrl,
        mediaId,
        linkClass,
        href,
        linkTarget,
        rel,
        height,
    } = attributes;
    const newRel = isEmpty( rel ) ? undefined : rel;

    let image = (
        <img
            src={ mediaUrl }
            alt={ mediaAlt }
            className={
                mediaId && mediaType === 'image'
                    ? `wp-image-${ mediaId }`
                    : null
            }
        />
    );

    if ( href ) {
        image = (
            <a
                className={ linkClass }
                href={ href }
                target={ linkTarget }
                rel={ newRel }
            >
                { image }
            </a>
        );
    }

    const mediaTypeRenders = {
        image: () => image,
        video: () => <video controls src={ mediaUrl } />,
    };
    const classes = classnames('buba-card-block',{
        'is-stacked-on-mobile': isStackedOnMobile,
    } );


    return (
        <div { ...useBlockProps.save( { className: classes } ) }
        >
            <figure
                className="wp-block-card__media"
                style={{
                    height: height || height === 0 ? height+'px' : undefined,
                }}
            >
                { ( mediaTypeRenders[ mediaType ] || noop )() }
            </figure>
            <div className="wp-block-card__content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}