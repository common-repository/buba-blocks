import FastAverageColor from 'fast-average-color';
import tinycolor from 'tinycolor2';
import {useEffect, useRef, useState} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import {
    withColors,
    __experimentalUseGradient,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';
import {
    withNotices,
    RangeControl,
} from '@wordpress/components';
import {withDispatch} from '@wordpress/data';
import {compose, withInstanceId, useInstanceId} from '@wordpress/compose';

function retrieveFastAverageColor() {
    if (!retrieveFastAverageColor.fastAverageColor) {
        retrieveFastAverageColor.fastAverageColor = new FastAverageColor();
    }
    return retrieveFastAverageColor.fastAverageColor;
}

/**
 * useCoverIsDark is a hook that returns a boolean variable specifying if the cover
 * background is dark or not.
 *
 * @param {?string} url          Url of the media background.
 * @param {?number} dimRatio     Transparency of the overlay color. If an image and
 *                               color are set, dimRatio is used to decide what is used
 *                               for background darkness checking purposes.
 * @param {?string} overlayColor String containing the overlay color value if one exists.
 * @param {?Object} elementRef   If a media background is set, elementRef should contain a reference to a
 *                               dom element that renders that media.
 *
 * @return {boolean} True if the cover background is considered "dark" and false otherwise.
 */
function useCoverIsDark(url, dimRatio = 50, overlayColor, elementRef) {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        // If opacity is lower than 50 the dominant color is the image or video color,
        // so use that color for the dark mode computation.
        if (url && dimRatio <= 50 && elementRef.current) {
            retrieveFastAverageColor().getColorAsync(
                elementRef.current,
                (color) => {
                    setIsDark(color.isDark);
                }
            );
        }
    }, [url, url && dimRatio <= 50 && elementRef.current, setIsDark]);
    useEffect(() => {
        // If opacity is greater than 50 the dominant color is the overlay color,
        // so use that color for the dark mode computation.
        if (dimRatio > 50 || !url) {
            if (!overlayColor) {
                // If no overlay color exists the overlay color is black (isDark )
                setIsDark(true);
                return;
            }
            setIsDark(tinycolor(overlayColor).isDark());
        }
    }, [overlayColor, dimRatio > 50 || !url, setIsDark]);
    useEffect(() => {
        if (!url && !overlayColor) {
            // Reset isDark
            setIsDark(false);
        }
    }, [!url && !overlayColor, setIsDark]);
    return isDark;
}


function ColorEdit({attributes, setAttributes}) {
    const {
        dimRatio,
        mediaUrl,
        overlayColor,
    } = attributes;
    const {
        gradientClass,
        gradientValue,
        setGradient,
    } = __experimentalUseGradient();

    const isDarkElement = useRef();
    const isDark = useCoverIsDark(
        mediaUrl,
        dimRatio,
        overlayColor,
        isDarkElement
    );
    const setOverlayColor = (newOverlayColor) =>{
        setAttributes({overlayColor: newOverlayColor});
    }
    return <div>
        <PanelColorGradientSettings
            title={__('Overlay', 'buba-blocks')}
            settings={[
                {
                    colorValue: overlayColor,
                    gradientValue,
                    onColorChange: setOverlayColor,
                    onGradientChange: setGradient,
                    label: __('Color', 'buba-blocks'),
                },
            ]}
        />
        {!!mediaUrl && (
            <RangeControl
                label={__('Opacity', 'buba-blocks')}
                value={dimRatio}
                onChange={(newDimRation) =>
                    setAttributes({
                        dimRatio: newDimRation,
                    })
                }
                min={0}
                max={100}
                required
            />
        )}
    </div>
}

export default compose([
    withDispatch((dispatch) => {
        const {toggleSelection} = dispatch('core/block-editor');

        return {
            toggleSelection,
        };
    }),
    withColors({overlayColor: 'background-color'}),
    withNotices,
    withInstanceId,
])(ColorEdit);