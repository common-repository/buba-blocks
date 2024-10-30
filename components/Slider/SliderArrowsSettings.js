import { __ } from "@wordpress/i18n";
import { PanelBody, RangeControl } from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";

import ColorControl from "../color-control";

import defaultColors from "../../assets/defaultColors";

const GetReactArrow = (props) => {
  const { className, style, onClick, customStyle } = props;
  return (
    <div
      className={className + " buba-blocks-slider__arrow"}
      style={{ ...style, display: "block", ...customStyle }}
      onClick={onClick}
    />
  );
};

const SliderArrowsSettings = ({ settings, setSettings, setAttributes }) => {
  const [arrows, setArrows] = useState(
    settings.arrowsStyle
      ? settings.arrowsStyle
      : {
          "--size": "20px",
          "--color": "#000",
          "--color-hover": "#000",
          "--transition": "300ms",
        }
  );

  useEffect(() => {
    let styleString;
    if (arrows) {
      styleString = Object.entries(arrows)
        .map(([k, v]) => `${k}:${v}`)
        .join(";");
    }

    setSettings({
      ...settings,
      arrowsStyle: arrows,
      prevArrow: `<button type="button" class="slick-prev buba-blocks-slider__arrow" style="${styleString}"></button>`,
      nextArrow: `<button type="button" class="slick-next buba-blocks-slider__arrow" style="${styleString}"></button>`,
    });
  }, [arrows]);

  const onChangeSliderArrowParam = (value, name) => {
    if (typeof value !== "undefined" && name) {
      if (name === "--size") {
        setArrows({
          ...arrows,
          [name]: value + "px",
        });
      } else if (name === "transition") {
        setArrows({
          ...arrows,
          [name]: value + "ms",
        });
      } else {
        setArrows({
          ...arrows,
          [name]: value,
        });
      }
    }
  };

  return (
    <PanelBody title={__("Arrows", "buba-blocks")} initialOpen={false}>
      <RangeControl
        value={parseInt(arrows["--size"])}
        onChange={(value) => onChangeSliderArrowParam(value, "--size")}
        min={5}
        max={100}
        label={__("Size", "buba-blocks")}
      />
      <RangeControl
        value={parseInt(arrows["--transition"])}
        onChange={(value) => onChangeSliderArrowParam(value, "--transition")}
        min={100}
        max={3000}
        step={50}
        label={__("Duration", "buba-blocks")}
      />
      <ColorControl
        value={arrows["--color"]}
        colors={defaultColors}
        onChange={(value) => onChangeSliderArrowParam(value, "--color")}
        label={__("Color", "buba-blocks")}
      />
      <ColorControl
        value={arrows["--color-hover"]}
        colors={defaultColors}
        onChange={(value) => onChangeSliderArrowParam(value, "--color-hover")}
        label={__("Hover color", "buba-blocks")}
      />
    </PanelBody>
  );
};

export default SliderArrowsSettings;
export { GetReactArrow };
