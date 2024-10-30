import { __ } from '@wordpress/i18n';
import { PanelBody } from "@wordpress/components";
import { useMemo, useState } from '@wordpress/element';

import RangeAndTypes from './range-and-types';

const SizesControl = props => {
  const {
    value,
    onChange,
    exclude
  } = props;

  const [sizes, setSizes] = useState( value );

  useMemo(() => {
    onChange(sizes);
  }, [sizes]);

  return(
    <PanelBody title={ __( 'Sizes', 'buba-blocks' ) } initialOpen={ false }>
      <div className="buba-blocks-side-box">
        { exclude !== 'width'  &&
          <RangeAndTypes
            value={ sizes.width || 100 }
            onChange={ width => setSizes({ ...sizes, width }) }
            label={ __( 'Width', 'buba-blocks' ) }
            max={ 1000 }
          />
        }
        { exclude !== 'height' &&
          <RangeAndTypes 
            value={ sizes.height || 100 }
            onChange={ height => setSizes({ ...sizes, height }) }
            label={ __( 'Height', 'buba-blocks' ) }
            max={ 1000 }
          />
        }
      </div>
    </PanelBody>
  );
};

export default SizesControl;