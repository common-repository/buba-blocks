/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    RichText,
    useBlockProps,
    __experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';


export default function save({attributes, className}) {
    const {borderRadius, linkTarget, rel, text, title, url, alignment, buttonPadding, width, backgroundHover, textHover, duration, isSubmit} = attributes;
    const colorProps = getColorClassesAndStyles(attributes);
    const buttonClasses = classnames(
        'wp-block-button__link',
        colorProps.className,
        {
            'no-border-radius': borderRadius === 0,
        }
    );
    const buttonWrapperClasses = classnames(className, {
            [`has-custom-width wp-block-button__width-${width}`]: width,
        },
        alignment ? 'align-button-' + alignment : ''
    );
    const buttonStyle = {
        borderRadius: borderRadius ? borderRadius + 'px' : undefined,
        ...colorProps.style,
        padding: buttonPadding.top + ' ' + buttonPadding.right + ' ' + buttonPadding.bottom + ' ' + buttonPadding.left,
        ['--background-hover']: backgroundHover,
        ['--text-hover']: textHover,
        ['--transition-duration']: duration + 'ms'
    };

    // The use of a `title` attribute here is soft-deprecated, but still applied
    // if it had already been assigned, for the sake of backward-compatibility.
    // A title will no longer be assigned for new or updated button block links.

    return (
        <div {...useBlockProps.save({className: buttonWrapperClasses})}>
            { isSubmit ?
                <RichText.Content
                    tagName='button'
                    type='submit'
                    className={buttonClasses}
                    title={title}
                    style={buttonStyle}
                    value={text}
                    target={linkTarget}
                    rel={rel}
                />
                :
                <RichText.Content
                    tagName='a'
                    className={buttonClasses}
                    href={url}
                    title={title}
                    style={buttonStyle}
                    value={text}
                    target={linkTarget}
                    rel={rel}
                />
            }
        </div>
    );
}