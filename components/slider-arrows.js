import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

import ColorControl from './color-control';

import defaultColors from '../assets/defaultColors';

const GetReactArrow = (props) => {
  const { className, style, onClick, customStyle } = props;
  return (
    <div
      className={className + ' buba-blocks-slider__arrow'}
      style={{ ...style, display: "block", ...customStyle }}
      onClick={onClick}
    />
  );
}

const GetHTMLArrow = (setting) => {
  const newObj = setting;
  let styleString;

  if (newObj.arrowsStyle) {
    styleString = (
      Object.entries(newObj.arrowsStyle).map(([k, v]) => `${k}:${v}`).join(';')
    );

    newObj.nextArrow = `<button type="button" class="slick-next buba-blocks-slider__arrow" style="${styleString}"></button>`;
    newObj.prevArrow = `<button type="button" class="slick-prev buba-blocks-slider__arrow" style="${styleString}"></button>`;
  }

  return newObj;
}

const SliderArrows = props => {
  const [size, setSize] = useState(parseInt(props.value['--size']));
  const [color, setColor] = useState(props.value['--color']);
  const [hoverColor, setHoverColor] = useState(props.value['--color-hover']);
  const [trans, setTrans] = useState(parseInt(props.value['--transition']));

  useEffect(() => {
    props.onChange({
      '--size': size+'px',
      '--color': color,
      '--color-hover': hoverColor,
      '--transtion': trans+'ms'
    });
  }, [size, color, hoverColor, trans]);

  return (
    <PanelBody title={__('Arrows', 'buba-blocks')} initialOpen={false}>
      <RangeControl 
        value={size}
        onChange={setSize}
        min={5}
        max={100}
        label={__('Size', 'buba-blocks')}
      />
      <RangeControl 
        value={trans}
        onChange={setTrans}
        min={100}
        max={3000}
        step={50}
        label={__('Duration', 'buba-blocks')}
      />
      <ColorControl 
        value={color}
        colors={defaultColors}
        onChange={setColor}
        label={__('Color', 'buba-blocks')}
      />
      <ColorControl 
        value={hoverColor}
        colors={defaultColors}
        onChange={setHoverColor}
        label={__('Hover color', 'buba-blocks')}
      />
    </PanelBody>
  );
};

export default SliderArrows;
export { GetReactArrow, GetHTMLArrow };