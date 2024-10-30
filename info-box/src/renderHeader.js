export default function renderHeader(props = {}) {
  const {
    icon,
    isIcon,
    iconSize,
    image,
    imageMB,
    imageHeight,
    iconBox
  } = props.attributes;

  if (isIcon && icon) {
    return (
      <div 
        className="wp-block-info-box__icon-wrapper"
        style={{
          padding: iconBox.top + ' ' + iconBox.right + ' ' + iconBox.bottom + ' ' + iconBox.left
        }}
      >
        <img 
          src={ icon ? icon['sizes']['full']['url'] : null }
          alt={ icon ? icon['alt'] : null }
          style={{
            width: iconSize[0],
            height: iconSize[0],
            objectFit: 'contain'
          }} 
        />
      </div>
    );
  } else if (!isIcon && image) {
    return (
      <div className="wp-block-info-box__img-wrapper" style={{ marginBottom: imageMB }}>
        <img 
          src={ image ? image['sizes']['full']['url'] : null }
          alt={ image ? image['alt'] : null }
          style={{
            width: '100%',
            height: image ? imageHeight : '0',
            objectFit: 'cover'
          }} 
        />
      </div>
    ); 
  } else {
    return false;
  }
}