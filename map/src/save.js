// Import block dependencies and components


/**
 * WordPress dependencies
 */
import {useBlockProps,} from '@wordpress/block-editor';

import classnames from 'classnames';

export default function Save({attributes}) {
    const {
        key,
        address,
        zoom,
        height,
        language,
    } = attributes;

    const classes = classnames('buba-map', {});

    const style = {
        height: height ? height : undefined,
    }

    const src = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${address}&zoom=${zoom}&language=${language}`;

    return (
        <div {...useBlockProps.save({className: classes})}>
            <iframe
                src={src}
                style={style}
                className="buba-map__iframe"
            />
        </div>

    );
}
