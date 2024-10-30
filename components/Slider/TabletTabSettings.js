/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useRegistry } from "@wordpress/data";
import { RangeControl } from "@wordpress/components";

export const TabletTabSettings = () => {
  const { settings, onChangeSliderParam } = useRegistry();

  return (
    <>
      <RangeControl
        label={__("Slides to show", "buba-blocks")}
        value={settings.responsive[0].settings.slidesToShow}
        onChange={(value) =>
          onChangeSliderParam(settings.fade ? 1 : value, "responsive", {
            num: 0,
            key: "slidesToShow",
          })
        }
        min={1}
        max={6}
      />
      {settings.responsive[0].settings.slidesToShow > 1 && (
        <RangeControl
          label={__("Slides to scroll", "buba-blocks")}
          value={settings.responsive[0].settings.slidesToScroll}
          onChange={(value) =>
            onChangeSliderParam(settings.fade ? 1 : value, "responsive", {
              num: 0,
              key: "slidesToScroll",
            })
          }
          min={1}
          max={settings.responsive[0].settings.slidesToShow}
        />
      )}
    </>
  );
};
