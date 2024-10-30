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
        typeWidth,
        tabletHeight,
        mobileHeight,
        desktopHeight,
        animationType,
        animationDuration,
        animationDelay,
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
        gradient,
        showScrollDown,
        scrollDownText,
        leftPositionScrollDown,
        bottomPositionScrollDown,
        border,
        borderRadius
    } = attributes;

    const gradientClass = __experimentalGetGradientClass(gradient);

    function dimRatioToClass(ratio) {
        return ratio === 0 || ratio === 50 || !ratio
            ? null
            : 'buba-has-background-dim-' + 10 * Math.round(ratio / 10);
    }

    const wrapperClasses = classnames('buba-section', dimRatioToClass(dimRatio), {
        [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
        [`width-${typeWidth}`]: typeWidth,
        'height-reset-tablet': tabletHeight,
        'height-reset-mobile': mobileHeight,
        [`buba-wow ${animationType}`]: animationType !== 'none',
        [`buba-wow animated ${animationType}`]: animationType !== 'none',
        [`buba-padding-top-${spacing.padding.top.typeSpacing}`]: spacing.padding.top.typeSpacing,
        [`buba-padding-right-${spacing.padding.right.typeSpacing}`]: spacing.padding.right.typeSpacing,
        [`buba-padding-bottom-${spacing.padding.bottom.typeSpacing}`]: spacing.padding.bottom.typeSpacing,
        [`buba-padding-left-${spacing.padding.left.typeSpacing}`]: spacing.padding.left.typeSpacing,
        [`buba-margin-top-${spacing.margin.top.typeSpacing}`]: spacing.margin.top.typeSpacing,
        [`buba-margin-right-${spacing.margin.right.typeSpacing}`]: spacing.margin.right.typeSpacing,
        [`buba-margin-bottom-${spacing.margin.bottom.typeSpacing}`]: spacing.margin.bottom.typeSpacing,
        [`buba-margin-left-${spacing.margin.left.typeSpacing}`]: spacing.margin.left.typeSpacing,
        'buba-has-background-dim': (overlayColor && dimRatio !== 0) || customOverlayColor || gradient || customGradient,
    });

    const styles = {
        maxWidth: typeWidth === 'custom' && Number.isFinite(width) ? width + 'px' : undefined,
        minHeight: desktopHeight ? desktopHeight : undefined,
        paddingTop: spacing.padding.top.typeSpacing === 'custom' ? spacing.padding.top.number + 'px' : undefined,
        paddingRight: spacing.padding.right.typeSpacing === 'custom' ? spacing.padding.right.number + 'px' : undefined,
        paddingBottom: spacing.padding.bottom.typeSpacing === 'custom' ? spacing.padding.bottom.number + 'px' : undefined,
        paddingLeft: spacing.padding.left.typeSpacing === 'custom' ? spacing.padding.left.number + 'px' : undefined,
        marginTop: spacing.margin.top.typeSpacing === 'custom' ? spacing.margin.top.number + 'px' : undefined,
        marginRight: spacing.margin.right.typeSpacing === 'custom' ? spacing.margin.right.number + 'px' : undefined,
        marginBottom: spacing.margin.bottom.typeSpacing === 'custom' ? spacing.margin.bottom.number + 'px' : undefined,
        marginLeft: spacing.margin.left.typeSpacing === 'custom' ? spacing.margin.left.number + 'px' : undefined,
        backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined,
        backgroundSize: backgroundSize ? backgroundSize : undefined,
        backgroundPosition: backgroundPosition === 'custom' ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : backgroundPosition && mediaUrl ? backgroundPosition : undefined,
        backgroundAttachment: backgroundAttachment ? backgroundAttachment : undefined,
        backgroundRepeat: backgroundRepeat ? backgroundRepeat : undefined,
        backgroundColor: overlayColor ? overlayColor : undefined,
        ...border,
        borderRadius,
    };


    return (
        <div
            {...useBlockProps.save({
                className: wrapperClasses,
                style: styles,
                [`data-wow-duration`] : animationType !== 'none' ? animationDuration : undefined,
                [`data-wow-delay`] : animationType !== 'none' ? animationDelay + 'ms' : undefined
            })}
            >
            {(gradient || customGradient) && dimRatio !== 0 && (
                <span
                    aria-hidden="true"
                    className={classnames(
                        'buba-section__gradient-background',
                        gradientClass
                    )}
                    style={
                        customGradient
                            ? {background: customGradient}
                            : undefined
                    }
                />
            )}
            <div className="buba-section-inside">
                <InnerBlocks.Content/>
            </div>
            {showScrollDown && (
                <div
                    className="buba-scroll"
                    style={{
                        left: leftPositionScrollDown ? leftPositionScrollDown : undefined,
                        bottom: bottomPositionScrollDown ? bottomPositionScrollDown : undefined,
                    }}
                    id="buba-scroll"
                >
                    {scrollDownText}
                </div>
            )}
        </div>
    );
}