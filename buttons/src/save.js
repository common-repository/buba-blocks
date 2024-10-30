/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

import { styles2cssV } from "./funcs";

const save = (props) => {
  const { attributes } = props;

  const { contentJustification, orientation, styles, fontSize, style } =
    attributes;

  const blockProps = useBlockProps.save({
    className: classnames({
      [`is-content-justification-${contentJustification}`]:
        contentJustification,
      "wp-block-buba-blocks-buttons--vertical": orientation === "vertical",
      "has-custom-font-size": fontSize || style?.typography?.fontSize,
    }),
    style: styles2cssV(styles, "buba-blocks-buttons"),
  });

  const innerBlocksProps = useInnerBlocksProps.save(blockProps);

  return <div {...innerBlocksProps} />;
};

export default save;
