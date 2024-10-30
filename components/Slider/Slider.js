/**
 * External dependencies
 */
import Slick from "react-slick";
import { GetReactArrow } from "./SliderArrowsSettings";

function Slider({ settings, children, ...props }) {
  const newSliderSettings = {
    ...settings,
    prevArrow: <GetReactArrow customStyle={settings.arrowsStyle} />,
    nextArrow: <GetReactArrow customStyle={settings.arrowsStyle} />,
  };
  const sliderClasses = props.className
    ? props.className + " buba-blocks-slider"
    : "buba-blocks-slider";

  return (
    <Slick
      className={sliderClasses}
      style={{
        "--gap": settings.gap + "px",
      }}
      {...newSliderSettings}
    >
      {children}
    </Slick>
  );
}

export default Slider;
