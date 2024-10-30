/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    InnerBlocks,
    getColorClassName,
    __experimentalGetGradientClass, useBlockProps,
} from '@wordpress/block-editor';

export default function save({attributes}) {
    const {
        verticalAlignment,
        width,
        spacing,
        mediaUrl,
        backgroundSize,
        backgroundPosition,
        focalPoint,
        backgroundAttachment,
        backgroundRepeat,
        dimRatio,
        overlayColor,
        customOverlayColor,
        customGradient,
        gradient
    } = attributes;

    const gradientClass = __experimentalGetGradientClass( gradient );
    function dimRatioToClass(ratio) {
        return ratio === 0 || ratio === 50 || !ratio
            ? null
            : 'buba-has-background-dim-' + 10 * Math.round(ratio / 10);
    }

    const wrapperClasses = classnames('buba-container',dimRatioToClass(dimRatio),{
        [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
        [`buba-padding-top-${spacing.padding.top.typeSpacing}`] : spacing.padding.top.typeSpacing,
        [`buba-padding-right-${spacing.padding.right.typeSpacing}`] : spacing.padding.right.typeSpacing,
        [`buba-padding-bottom-${spacing.padding.bottom.typeSpacing}`] : spacing.padding.bottom.typeSpacing,
        [`buba-padding-left-${spacing.padding.left.typeSpacing}`] : spacing.padding.left.typeSpacing,
        [`buba-margin-top-${spacing.margin.top.typeSpacing}`] : spacing.margin.top.typeSpacing,
        [`buba-margin-bottom-${spacing.margin.bottom.typeSpacing}`] : spacing.margin.bottom.typeSpacing,
        'buba-has-background-dim': (overlayColor && dimRatio !== 0) || customOverlayColor || gradient || customGradient,
    });

    const styles = {
        maxWidth: width ? width : undefined,
        paddingTop: spacing.padding.top.typeSpacing === 'custom' ? spacing.padding.top.number+'px' : undefined,
        paddingRight: spacing.padding.right.typeSpacing === 'custom' ? spacing.padding.right.number+'px' : undefined,
        paddingBottom: spacing.padding.bottom.typeSpacing === 'custom' ? spacing.padding.bottom.number+'px' : undefined,
        paddingLeft: spacing.padding.left.typeSpacing === 'custom' ? spacing.padding.left.number+'px' : undefined,
        marginTop: spacing.margin.top.typeSpacing === 'custom' ? spacing.margin.top.number+'px' : undefined,
        marginBottom: spacing.margin.bottom.typeSpacing === 'custom' ? spacing.margin.bottom.number+'px' : undefined,
        backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined,
        backgroundSize: backgroundSize ? backgroundSize : undefined,
        backgroundPosition: backgroundPosition==='custom' ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : backgroundPosition && mediaUrl ? backgroundPosition : undefined,
        backgroundAttachment: backgroundAttachment ? backgroundAttachment : undefined,
        backgroundRepeat: backgroundRepeat ? backgroundRepeat : undefined,
        backgroundColor: overlayColor ? overlayColor : undefined,
    };


    return (
        <div
            {...useBlockProps.save({
                className: wrapperClasses,
                style: styles
            })}
        >
            {( gradient || customGradient ) && dimRatio !== 0 && (
            <span
                aria-hidden="true"
                className={ classnames(
                    'buba-container__gradient-background',
                    gradientClass
                ) }
                style={
                    customGradient
                        ? { background: customGradient }
                        : undefined
                }
            />
            ) }
            <div className="buba-container-inside">
                <InnerBlocks.Content/>
            </div>
        </div>
    );
}