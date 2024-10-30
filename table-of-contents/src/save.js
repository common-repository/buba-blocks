// Import block dependencies and components


/**
 * WordPress dependencies
 */
import {RichText, useBlockProps,} from '@wordpress/block-editor';

import classnames from 'classnames';

export default function Save({attributes}) {
    const {
        title,
        titleColor,
        titleFontSize,
        titleBottomSpacing,
        titleAlign,
        horizontalPadding,
        verticalPadding,
        backgroundColor,
        customWidth,
        desktopWidth,
        tabletWidth,
        mobileWidth,
        contentFontSize,
        contentColor,
        contentAlign,
        borderStyle,
        borderWidth,
        borderRadius,
        borderColor,
        headersItems,
        verticalMargin,
        horizontalMargin,
    } = attributes;

    const classes = classnames('buba-table-of-contents', {
        'width-reset-tablet': tabletWidth,
        'width-reset-mobile': mobileWidth,
    });

    const style = {
        paddingTop: verticalPadding ? verticalPadding + 'px' : undefined,
        paddingBottom: verticalPadding ? verticalPadding + 'px' : undefined,
        paddingRight: horizontalPadding ? horizontalPadding + 'px' : undefined,
        paddingLeft: horizontalPadding ? horizontalPadding + 'px' : undefined,
        marginTop: verticalMargin ? verticalMargin + 'px' : undefined,
        marginBottom: verticalMargin ? verticalMargin + 'px' : undefined,
        marginRight: horizontalMargin ? horizontalMargin + 'px' : undefined,
        marginLeft: horizontalMargin ? horizontalMargin + 'px' : undefined,
        backgroundColor: backgroundColor ? backgroundColor : undefined,
        minWidth: customWidth && desktopWidth ? desktopWidth : undefined,
        borderStyle: borderStyle !== 'none' ? borderStyle : undefined,
        borderWidth: borderStyle !== 'none' && borderWidth ? borderWidth + 'px' : undefined,
        borderRadius: borderStyle !== 'none' && borderRadius ? borderRadius + 'px' : undefined,
        borderColor: borderColor ? borderColor : undefined,
    }
    return (
        <div {...useBlockProps.save({className: classes, style})}>
            <RichText.Content
                tagName="h3"
                value={title}
                className="buba-table-of-contents__title"
                style={{
                    fontSize: titleFontSize ? titleFontSize + 'px' : undefined,
                    color: titleColor ? titleColor : undefined,
                    marginBottom: titleBottomSpacing ? titleBottomSpacing : undefined,
                    textAlign: titleAlign,
                }}
            />
            <ul className="buba-table-of-contents__list">
                {
                    headersItems &&
                    headersItems.map((block, id) => {
                        return (
                            <li key={'key'+id} className="buba-table-of-contents__list-item"
                                style={{
                                    textAlign: contentAlign ? contentAlign : undefined,
                                }}
                            >
                                <a href={'#'+block.slug}
                                   data-link={block.slug}
                                   data-level={block.level}
                                   style={{
                                       fontSize: contentFontSize ? contentFontSize : undefined,
                                       color: contentColor ? contentColor : undefined,
                                   }}
                                   className="buba-table-of-contents__list-link"
                                >
                                    {block.text}
                                </a>
                            </li>
                        )

                    })
                }
            </ul>
        </div>

    );
}
