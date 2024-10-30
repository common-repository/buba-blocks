// Import block dependencies and components
import Accordion from './accordion';

/**
 * WordPress dependencies
 */
import {RichText, InnerBlocks} from '@wordpress/block-editor';

import classnames from 'classnames';

export default function Save({attributes, ...props}) {
    const {
        accordionOpen,
        accordionTitle,
        accordionFontSize,
        accordionOpenColor,
        border,
        accordionOpenBgColor,
        borderOpenColor,
        borderRadius,
        background,
        color
    } = attributes;

    const style = {
        '--open-color': accordionOpenColor,
        '--bg-open-color': accordionOpenBgColor,
        '--border-open-color': borderOpenColor,
        '--border-width': border?.borderWidth,
        '--border-style': border?.borderStyle,
        '--border-color': border?.borderColor
    };
    const headerStyle = {
        fontSize: accordionFontSize ? accordionFontSize+'px' : undefined,
        borderRadius: border ? borderRadius+'px' : undefined,
        background
    };
    const titleStyle = {
        color
    }


    return (
        <Accordion props={props} style={style}>
            <div 
                className={classnames('buba-accordion__title-wrap',{
                    'buba-open': accordionOpen,
                })}
                style={{...headerStyle}}
            >
                <div
                    className="buba-accordion__title"
                    style={{...titleStyle}}>
                    <RichText.Content
                        value={accordionTitle}
                    />
                </div>
                <span className="buba-arrow-down"/>
            </div>
            <div
                className="buba-accordion__text"
                style={{
                    display: accordionOpen ? 'block' : undefined,
                }}
            >
                <InnerBlocks.Content/>
            </div>
        </Accordion>
    );
}
