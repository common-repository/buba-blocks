
const styles2cssV = (styles, prefix = null ) => {
  const newStyles = {};

  if ( styles && Object.keys(styles).length > 0 ) {
    for ( const key in styles ) {
      newStyles[ prefix ? '--' + prefix + '-' + key : '--' + key ] = styles[key]; 
    }
  }

  return newStyles;
}

export {
  styles2cssV
};