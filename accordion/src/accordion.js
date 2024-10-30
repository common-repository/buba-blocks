/**
 * Accordion Wrapper
 */

// Setup the block

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Accordion wrapper Component
 */
function Accordion (props) {
    return (
        <div
            className={classnames(
                'buba-accordion',
            ) }
            style={{...props.style}}
        >
            { props.children }
        </div>
    );
}
export default Accordion;
