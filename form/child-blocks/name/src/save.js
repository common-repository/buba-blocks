
/**
 * External dependencies
 */
 import classnames from 'classnames';

 /**
  * WordPress dependencies
  */
 import { 
    useBlockProps
} from '@wordpress/block-editor';
import { styles2cssV } from '../../../../assets/funcs';


const save = props => {
    const {
        attributes
    } = props;

    const {
        styles,
        text,
        inspector
    } = attributes;

    return (
        <div
            { ...useBlockProps.save( {
                className: classnames( 'buba-blocks-name-input' ),
                style: styles2cssV( styles, 'buba-blocks-name-input' )
            } ) }
        >
            <input
                placeholder={ text }
                name="name"
                type="text"
                required={ inspector.required }
            />
        </div>
    );
}

export default save;