/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import {
  PanelBody,
  Notice,
  RangeControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";

const ALLOWED_BLOCKS = ["buba-blocks/social-share-child"];

const layouts = [
  { label: __("Horizontal", "buba-blocks"), value: "is-horizontal" },
  { label: __("Vertical", "buba-blocks"), value: "is-vertical" },
];

const sizeOptions = [
  { label: __("Small", "buba-blocks"), value: 24 },
  { label: __("Normal", "buba-blocks"), value: 30 },
  { label: __("Large", "buba-blocks"), value: 36 },
  { label: __("Huge", "buba-blocks"), value: 42 },
];

const stackOns = [
  { label: __("None", "buba-blocks"), value: "none" },
  { label: __("Desktop", "buba-blocks"), value: "desktop" },
  { label: __("Tablet", "buba-blocks"), value: "tablet" },
  { label: __("Mobile", "buba-blocks"), value: "mobile" },
];

function Edit({ attributes, setAttributes }) {
  const {
    layout,
    stackOn,
    size,
    gap,
    borderRadius,
    openInNewTab,
    isSimilarWidth,
    iconWidth,
  } = attributes;

  const className = classnames(layout, "buba-social-share", {
    [`is-stack-${stackOn}`]: stackOn !== "none",
  });

  const SocialPlaceholder = (
    <div className="buba-social-share__placeholder">
      <div className="buba-social-share-link"></div>
      <div className="buba-social-share__placeholder-icons">
        <div className="buba-social-share-link buba-social-share-link--twitter"></div>
        <div className="buba-social-share-link buba-social-share-link--facebook"></div>
        <div className="buba-social-share-link buba-social-share-link--instagram"></div>
      </div>
    </div>
  );

  const blockProps = useBlockProps({ className });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    orientation: "horizontal",
    placeholder: SocialPlaceholder,
    templateLock: false,
    __experimentalAppenderTagName: "li",
  });

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__("General", "buba-blocks")}
          className="buba-social-share__settings"
        >
          <SelectControl
            label={__("Layout", "buba-blocks")}
            value={layout}
            onChange={(layout) => {
              setAttributes({
                layout,
              });
            }}
            options={layouts}
          />
          <SelectControl
            label={__("Stack on", "buba-blocks")}
            value={stackOn}
            onChange={(stackOn) => {
              setAttributes({
                stackOn,
              });
            }}
            options={stackOns}
          />
          <SelectControl
            label={__("Size", "buba-blocks")}
            value={size}
            onChange={(size) => {
              setAttributes({
                size,
              });
            }}
            options={sizeOptions}
          />
          <ToggleControl
            label={__("is similar width", "buba-blocks")}
            checked={isSimilarWidth}
            onChange={(isSimilarWidth) => setAttributes({ isSimilarWidth })}
          />
          {!isSimilarWidth && (
            <RangeControl
              label={__("Icon width", "buba-blocks")}
              value={iconWidth}
              onChange={(iconWidth) => setAttributes({ iconWidth })}
              min={5}
              max={100}
            />
          )}
          <RangeControl
            value={borderRadius}
            label={__("Border radius", "buba-blocks")}
            min={0}
            max={500}
            allowReset
            onChange={(borderRadius) => {
              setAttributes({
                borderRadius,
              });
            }}
          />
          <Notice status="info" isDismissible={false}>
            {__(
              "Note: Border Radius option is useful when one adds background color to the icons.",
              "buba-blocks"
            )}
          </Notice>
          <RangeControl
            value={gap}
            label={__("Gap between Items", "buba-blocks")}
            min={0}
            max={100}
            allowReset
            onChange={(gap) => {
              setAttributes({
                gap,
              });
            }}
          />
          <Notice status="info" isDismissible={false}>
            {__(
              "Note: The gap between the items will seem larger in the editor, for better user edit experience.But at frontend the gap will be exactly what is set from here.",
              "buba-blocks"
            )}
          </Notice>
          <PanelBody title={__("Link settings", "buba-blocks")}>
            <ToggleControl
              label={__("Open links in new tab", "buba-blocks")}
              checked={openInNewTab}
              onChange={() => setAttributes({ openInNewTab: !openInNewTab })}
            />
          </PanelBody>
        </PanelBody>
      </InspectorControls>
      <ul {...innerBlocksProps} />
    </>
  );
}

export default Edit;
