
/**
 * External dependencies
 */
 import classnames from 'classnames';

 /**
  * WordPress dependencies
  */
 import { 
    useBlockProps,
    InnerBlocks
} from '@wordpress/block-editor';
import { styles2cssV } from '../../assets/funcs';


const save = props => {
    const {
        attributes
    } = props;

    const {
        styles,
        inspector
    } = attributes;

    return (
        <form
			{ ...useBlockProps.save( {
				className: classnames( 'buba-blocks-form' ),
                style: styles2cssV( styles, 'buba-blocks-form' )
			} ) }
            {...inspector}
		>
            <InnerBlocks.Content />
		</form>
    );
}

export default save;