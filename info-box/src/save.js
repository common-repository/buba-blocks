/**
 * WordPress dependencies
 */
import { 
  useBlockProps,
  RichText
} from '@wordpress/block-editor';

/**
 * Components
 */
import RenderHeader from './renderHeader';

export default function save({attributes}) {
  const {
    titleDecoration,
    titleLineColor,
    titleMarginBottom,
    titlePaddingBottom,
    title,
    titlePosition,
    titleTag,
    textPosition,
    textSize,
    text,
} = attributes;

  let renderLine = null;
  if (titleDecoration) {
    renderLine = <div 
        className={`wp-block-info-box__line`}
        style={{backgroundColor: titleLineColor}}
    ></div>;
  }

  return (
    <div { ...useBlockProps.save( { className: 'wp-block-info-box' } ) }>
      <RenderHeader 
        attributes={ attributes } 
      />
      <div 
          className={`wp-block-info-box__title-wrapper wp-block-info-box__title-wrapper--position_${titlePosition}`}
          style={{
              marginBottom: titleMarginBottom,
              paddingBottom: titlePaddingBottom
          }}
      >
          <RichText.Content
            className="wp-block-info-box__title" 
            tagName={ titleTag }
            value={ title }
          />
          {renderLine}
      </div>
      { text ? 
        <RichText.Content 
          className="wp-block-info-box__text" 
          tagName="p"
          value={ text }
          style={{
            fontSize: textSize,
            textAlign: textPosition,
          }}
        />
      : null}
    </div>
  );
}