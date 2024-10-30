import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import edit from "./edit";
import save from "./save";

import { fullWidthSliderIcon } from "../../assets/icons/icons";
import { Icon } from "@wordpress/components";

registerBlockType("buba-blocks/slider", {
  apiVersion: 2,
  title: __("Slider", "buba-blocks"),
  icon: <Icon icon={fullWidthSliderIcon} />,
  category: "buba",
  attributes: {
    countSlides: {
      type: "number",
      default: 1,
    },
    sliderSettings: {
      type: "object",
    },
  },
  supports: {
    anchor: true,
    align: ["wide", "full"],
    alignWide: false,
    lightBlockWrapper: true,
  },
  edit,
  save,
});
