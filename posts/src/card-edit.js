import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import { PanelBody, SelectControl } from "@wordpress/components";

import defaultColors from '../../assets/defaultColors';

import ColorControl from '../../components/color-control';

function CardEdit(props) {
  const [bgColor, setBgColor] = useState(props.value.card.backgroundColor);
  const [color, setColor] = useState(props.value.card.color);
  const [textSize, setTextSize] = useState(props.value.text.fontSize);
  const [anotherSize, setAnotherSize] = useState(props.value.another.fontSize);
  const [titleSize, setTitleSize] = useState(props.value.title.fontSize);

  const sizeForTitle = [
    {label: __('Extra-less', 'buba-blocks'), value: '14px'},
    {label: __('Less', 'buba-blocks'), value: '16px'},
    {label: __('Extra-small', 'buba-blocks'), value: '18px'},
    {label: __('Small', 'buba-blocks'), value: '20px'},
    {label: __('Normal', 'buba-blocks'), value: '24px'},
    {label: __('Large', 'buba-blocks'), value: '28px'},
    {label: __('Huge', 'buba-blocks'), value: '32px'}
  ];
  const sizeForText = [
    {label: __('Small', 'buba-blocks'), value: '18px'},
    {label: __('Normal', 'buba-blocks'), value: '20px'},
    {label: __('Large', 'buba-blocks'), value: '22px'},
    {label: __('Huge', 'buba-blocks'), value: '24px'}
  ];
  const sizeForAnother = [
    {label: __('Small', 'buba-blocks'), value: '14px'},
    {label: __('Normal', 'buba-blocks'), value: '16px'},
    {label: __('Large', 'buba-blocks'), value: '18px'},
    {label: __('Huge', 'buba-blocks'), value: '20px'}
  ];

  useEffect(() => {
    props.onChange({
      card: {
        backgroundColor: bgColor,
        color: color
      },
      title: {
        color: color,
        fontSize: titleSize
      },
      text: {
        color: color,
        fontSize: textSize
      },
      another: {
        color: color,
        fontSize: anotherSize
      }
    });
  }, [
    bgColor, 
    color, 
    anotherSize, 
    textSize, 
    titleSize
  ]);

  return (
    <PanelBody title={__('Card style setting', 'buba-blocks')} initialOpen={false} >
      <ColorControl
        label={__('Background color', 'buba-blocks')}
        value={bgColor}
        colors={defaultColors}
        onChange={setBgColor}
      />
      <ColorControl
        label={__('Text color', 'buba-blocks')}
        value={color}
        colors={defaultColors}
        onChange={setColor}
      />
      <SelectControl 
        label={__('Title size', 'buba-blocks')}
        options={sizeForTitle}
        value={titleSize}
        onChange={setTitleSize}
      />
      <SelectControl 
        label={__('Text size', 'buba-blocks')}
        options={sizeForText}
        value={textSize}
        onChange={setTextSize}
      />
      <SelectControl 
        label={__('Another text size', 'buba-blocks')}
        options={sizeForAnother}
        value={anotherSize}
        onChange={setAnotherSize}
      />
    </PanelBody>
  );
}

export default CardEdit;