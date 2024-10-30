/**
 * WordPress dependencies
 */
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
} from "@wordpress/block-editor";
import { useRef, useEffect, useState } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { dispatch, select, useSelect } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

/**
 * External dependencies
 */
import Slider from "../../components/Slider/Slider";
import { pullLeft, pullRight } from "@wordpress/icons";
import { SliderEditSettings } from "../../components/Slider/SliderEditSettings";

const ALLOWED_BLOCKS = ["core/cover"];
const COVER_TEMPLATE = [["core/cover"]];

function SliderEdit({ attributes, isSelected, setAttributes, ...props }) {
  const { countSlides, sliderSettings } = attributes;

  const [slidesHTML, setSlides] = useState();
  const slidesRef = useRef();
  const [isVisibleSlider, setVisibleSlider] = useState(
    countSlides ? countSlides > 1 : false
  );

  const countBlockSlides = useSelect((select) => {
    return select("core/block-editor").getBlock(props.clientId).innerBlocks
      .length;
  }, []);

  useEffect(() => {
    setSlidesHTML();
  }, []);

  useEffect(() => {
    setSlidesHTML();
    setAttributes({ countSlides: countBlockSlides });
  }, [countBlockSlides]);

  const setSlidesHTML = () => {
    if (slidesRef.current != undefined) {
      let tempSlidesHTML = Array.from(slidesRef.current.childNodes)
        .filter((element) => {
          if (element.className.includes("wp-block")) {
            return element;
          }
        })
        .map((element) => {
          return (
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: element.outerHTML,
                }}
              />
            </div>
          );
        });
      setSlides(tempSlidesHTML);
    }
  };

  const addNewSlide = () => {
    dispatch("core/block-editor").insertBlocks(
      createBlock("core/cover"),
      9999,
      props.clientId
    );
  };

  const removeSlide = () => {
    if (countSlides > 1) {
      const slidesHTML = Array.from(slidesRef.current.childNodes).filter(
        (element) => {
          if (element.className.includes("wp-block")) {
            return element;
          }
        }
      );
      const lastSlideId =
        slidesHTML[slidesHTML.length - 1].getAttribute("data-block");
      dispatch("core/block-editor").removeBlock(lastSlideId, true);
    }
  };

  const changeVisibleSlider = () => {
    setVisibleSlider(!isVisibleSlider);
    if (isVisibleSlider) {
      selectMainBlock();
    }
    setSlidesHTML();
  };

  const selectMainBlock = () => {
    dispatch("core/block-editor").selectBlock(props.clientId);
  };

  const renderAppender = () => (
    <div>
      <div className="control-slider">
        <Button
          icon="minus"
          className="components-button block-editor-button-block-appender"
          onClick={removeSlide}
        >
          {__("Remove Last Slide", "buba-blocks")}
        </Button>
        <Button
          icon="plus"
          className="components-button block-editor-button-block-appender"
          onClick={addNewSlide}
        >
          {__("Add Slide", "buba-blocks")}
        </Button>
      </div>
      <Button
        icon="cloud-saved"
        className="components-button block-editor-button-block-appender"
        onClick={changeVisibleSlider}
      >
        {__("Show slider", "buba-blocks")}
      </Button>
    </div>
  );

  const blockProps = useBlockProps();

  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: COVER_TEMPLATE,
    className: "slick-slider-wrap",
    renderAppender: renderAppender,
    orientation: "horizontal",
    __experimentalLayout: {
      type: "default",
      alignments: [],
    },
    templateInsertUpdatesSelection: true,
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <SliderEditSettings
          sliderSettings={sliderSettings}
          setAttributes={setAttributes}
          defaultSlidesToShow={1}
          initialOpen={true}
        />
      </InspectorControls>
      <>
        {isVisibleSlider && (
          <>
            <div className="buba-blocks-slider" onClick={selectMainBlock}>
              <Slider settings={sliderSettings} {...props}>
                {slidesHTML}
              </Slider>
            </div>
            <Button
              icon="edit"
              className="components-button block-editor-button-block-appender"
              onClick={changeVisibleSlider}
            >
              {__("Edit slider", "buba-blocks")}
            </Button>
          </>
        )}
        <div
          style={{
            display: isVisibleSlider ? "none" : "block",
          }}
        >
          <div {...innerBlocksProps} ref={slidesRef} />
        </div>
      </>
    </div>
  );
}

export default SliderEdit;
