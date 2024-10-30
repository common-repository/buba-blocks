/**
 * External dependencies
 */
import Slick from "react-slick";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { RegistryProvider, createRegistry } from "@wordpress/data";
import {
  RangeControl,
  PanelBody,
  ToggleControl,
  __experimentalNumberControl as NumberControl,
} from "@wordpress/components";

import ResponsiveTabPanel from "../ResponsiveTabPanel";
import { DesktopTabSettings } from "./DesktopTabSettings";
import { TabletTabSettings } from "./TabletTabSettings";
import { MobileTabSettings } from "./MobileTabSettings";
import SliderArrowsSettings from "../Slider/SliderArrowsSettings";

const registry = createRegistry({});

function SliderEditSettings({
  sliderSettings,
  setAttributes,
  defaultSlidesToShow = 3,
  initialOpen = false,
  ...props
}) {
  const [settings, setSettings] = useState(
    sliderSettings
      ? sliderSettings
      : {
          slidesToShow: defaultSlidesToShow,
          slidesToScroll: 1,
          gap: 10,
          dots: false,
          arrows: false,
          centerMode: false,
          centerPadding: "50px",
          infinite: false,
          fade: false,
          autoplay: false,
          autoplaySpeed: 3000,
          speed: 500,
          responsive: [
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false,
                arrows: false,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
              },
            },
          ],
        }
  );

  useEffect(() => {
    setAttributes({
      sliderSettings: settings,
    });
  }, [settings]);

  const onChangeSliderParam = (value, name, args) => {
    if (typeof value !== "undefined" && name) {
      if (name === "responsive") {
        const key = args.key;
        const newResponsiveSliderSettings = settings.responsive.map(
          (item, index) =>
            index === args.num
              ? { ...item, settings: { ...item.settings, [key]: value } }
              : item
        );
        setSettings({
          ...settings,
          [name]: newResponsiveSliderSettings,
        });
      } else if (name === "fade") {
        const newResponsiveSliderSettings = settings.responsive.map((item) => ({
          ...item,
          settings: {
            ...item.settings,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        }));
        setSettings({
          ...settings,
          [name]: value,
          slidesToScroll: 1,
          slidesToShow: 1,
          responsive: newResponsiveSliderSettings,
        });
      } else {
        setSettings({
          ...settings,
          [name]: value,
        });
      }
    }
  };

  return (
    <PanelBody
      title={__("Slider settings", "buba-blocks")}
      initialOpen={initialOpen}
    >
      <RegistryProvider value={{ registry, settings, onChangeSliderParam }}>
        <ResponsiveTabPanel
          desktop={<DesktopTabSettings />}
          tablet={<TabletTabSettings />}
          mobile={<MobileTabSettings />}
        />
      </RegistryProvider>
      <hr style={{ marginTop: "10px", marginBottom: "10px" }}></hr>
      <NumberControl
        label={__("Speed", "buba-blocks")}
        isShiftStepEnabled={true}
        onChange={(value) => onChangeSliderParam(value, "speed")}
        shiftStep={100}
        value={settings.speed}
        step={100}
      />
      <RangeControl
        label={__("Gap between slider elements", "buba-blocks")}
        value={settings.gap}
        onChange={(value) => onChangeSliderParam(value, "gap")}
        min={0}
        max={60}
      />
      <ToggleControl
        label={__("Dots navigation", "buba-blocks")}
        checked={settings.dots}
        onChange={(value) => onChangeSliderParam(value, "dots")}
      />
      <ToggleControl
        label={__("Arrows navigation", "buba-blocks")}
        checked={settings.arrows}
        onChange={(value) => onChangeSliderParam(value, "arrows")}
      />
      {settings.arrows && (
        <div style={{ marginBottom: "20px" }}>
          <SliderArrowsSettings
            settings={settings}
            setSettings={setSettings}
            setAttributes={setAttributes}
          />
        </div>
      )}
      <ToggleControl
        label={__("Infinite", "buba-blocks")}
        checked={settings.infinite}
        onChange={(value) => onChangeSliderParam(value, "infinite")}
      />
      <ToggleControl
        label={__("Center mode", "buba-blocks")}
        checked={settings.centerMode}
        onChange={(value) => onChangeSliderParam(value, "centerMode")}
      />
      {settings.centerMode && (
        <RangeControl
          label={__("Center padding", "buba-blocks")}
          value={settings.centerPadding}
          onChange={(value) => onChangeSliderParam(value, "centerPadding")}
          min={0}
          max={100}
        />
      )}
      <ToggleControl
        label={__("Fade", "buba-blocks")}
        checked={settings.fade}
        onChange={(value) => onChangeSliderParam(value, "fade")}
      />
      <ToggleControl
        label={__("Autoplay", "buba-blocks")}
        checked={settings.autoplay}
        onChange={(value) => onChangeSliderParam(value, "autoplay")}
      />
      {settings.autoplay && (
        <NumberControl
          label={__("Autoplay speed", "buba-blocks")}
          isShiftStepEnabled={true}
          onChange={(value) => onChangeSliderParam(value, "autoplaySpeed")}
          shiftStep={500}
          value={settings.autoplaySpeed}
          step={500}
        />
      )}
    </PanelBody>
  );
}

export { SliderEditSettings };
