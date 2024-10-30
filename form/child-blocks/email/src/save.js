
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
                className: classnames( 'buba-blocks-email-input' ),
                style: styles2cssV( styles, 'buba-blocks-email-input' )
            } ) }
        >
            <input
                placeholder={ text }
                name="email"
                type="email"
                required={ inspector.required }
            />
        </div>
    );
}

export default save;