/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';


export default function Save(props) {

    const {
        attributes: { layout, stackOn },
    } = props;
    const className = classnames(layout,'buba-social-share', {
        [`is-stack-${stackOn}`]: stackOn !== 'none'
    });

    return (
        <ul { ...useBlockProps.save( { className } ) }>
            <InnerBlocks.Content />
        </ul>

    );
}
