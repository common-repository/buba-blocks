/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  BlockControls,
  useBlockProps,
  useInnerBlocksProps,
  JustifyContentControl,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import StylesComponent from "./styles-editor";
import { styles2cssV } from "./funcs";

const ALLOWED_BLOCKS = ["buba-blocks/button"];
const BUTTONS_TEMPLATE = [["buba-blocks/button"]];
const DEFAULT_BLOCK = {
  name: "buba-blocks/button",
  attributesToCopy: [
    "backgroundColor",
    "border",
    "className",
    "fontFamily",
    "fontSize",
    "gradient",
    "style",
    "textColor",
    "width",
  ],
};
// const LAYOUT = {
//   type: "default",
//   alignments: [],
// };
const VERTICAL_JUSTIFY_CONTROLS = ["left", "center", "right"];
const HORIZONTAL_JUSTIFY_CONTROLS = [
  "left",
  "center",
  "right",
  "space-between",
];

const ButtonsEdit = (props) => {
  const { attributes, setAttributes } = props;

  const { contentJustification, orientation, styles } = attributes;

  const blockProps = useBlockProps({
    className: classnames({
      [`is-content-justification-${contentJustification}`]:
        contentJustification,
      "wp-block-buba-blocks-buttons--vertical": orientation === "vertical",
    }),
    style: styles2cssV(styles, "buba-blocks-buttons"),
  });

  // const innerBlocksProps = useInnerBlocksProps(blockProps, {
  //   allowedBlocks: ALLOWED_BLOCKS,
  //   template: BUTTONS_TEMPLATE,
  //   orientation,
  //   __experimentalLayout: LAYOUT,
  //   templateInsertUpdatesSelection: true,
  // });

  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    defaultBlock: DEFAULT_BLOCK,
    directInsert: true,
    template: BUTTONS_TEMPLATE,
    templateInsertUpdatesSelection: true,
    orientation: layout?.orientation ?? "horizontal",
  });

  const justifyControls =
    orientation === "vertical"
      ? VERTICAL_JUSTIFY_CONTROLS
      : HORIZONTAL_JUSTIFY_CONTROLS;

  return (
    <>
      <BlockControls group="block">
        <JustifyContentControl
          allowedControls={justifyControls}
          value={contentJustification}
          onChange={(value) => setAttributes({ contentJustification: value })}
          popoverProps={{
            position: "bottom right",
            isAlternate: true,
          }}
        />
      </BlockControls>
      <div {...innerBlocksProps} />
    </>
  );
};

export default StylesComponent(ButtonsEdit);
