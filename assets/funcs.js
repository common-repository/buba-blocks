
const styles2cssV = (styles, prefix = null ) => {
  const newStyles = {};

  if ( styles && Object.keys(styles).length > 0 ) {
    for ( const key in styles ) {
      newStyles[ prefix ? '--' + prefix + '-' + key : '--' + key ] = styles[key]; 
    }
  }

  return newStyles;
}

const indObj2str = obj => {
  if ( Object.keys(obj).length < 4 )
    return false;

  let string;

  string = obj.top;
  string += ' ' + obj.right;
  string += ' ' + obj.bottom;
  string += ' ' + obj.left;

  return string;
}

const str2indObj = string => {
  if ( ! string && string.length === 0 )
    return false; 

  const obj = {};
  const stringArray = string.split(' ');

  obj.top = stringArray[0];
  obj.right = stringArray[1];
  obj.bottom = stringArray[2];
  obj.left = stringArray[3];

  return obj;
}

const indParse = ind => {
  if ( typeof ind === 'string' )
    return str2indObj(ind);

  if ( typeof ind === 'object' )
    return indObj2str(ind);

  return false;
}

export {
  styles2cssV,
  indObj2str,
  str2indObj,
  indParse
};