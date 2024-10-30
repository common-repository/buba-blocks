/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useRegistry } from "@wordpress/data";
import { RangeControl } from "@wordpress/components";

export const DesktopTabSettings = () => {
  const { settings, onChangeSliderParam } = useRegistry();

  return (
    <>
      <RangeControl
        label={__("Slides to show", "buba-blocks")}
        value={settings.slidesToShow}
        onChange={(value) =>
          onChangeSliderParam(settings.fade ? 1 : value, "slidesToShow")
        }
        min={1}
        max={6}
      />
      {settings.slidesToShow > 1 && (
        <RangeControl
          label={__("Slides to scroll", "buba-blocks")}
          value={settings.slidesToScroll}
          onChange={(value) =>
            onChangeSliderParam(settings.fade ? 1 : value, "slidesToScroll")
          }
          min={1}
          max={settings.slidesToShow}
        />
      )}
    </>
  );
};
