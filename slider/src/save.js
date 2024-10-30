/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { sliderSettings } = attributes;
  return (
    <div {...useBlockProps.save()}>
      <div
        className="slick-slider-wrap"
        data-slick={`${JSON.stringify(sliderSettings)}`}
        style={{
          "--gap": sliderSettings?.gap,
        }}
      >
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
