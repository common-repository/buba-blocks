import { __ } from '@wordpress/i18n';

const typesOfSize = [
  { label: __( 'Pixels', 'buba-blocks' ), value: 'px' },
  { label: __( 'Percent', 'buba-blocks' ), value: '%' },
  { label: __( 'Regarding parent FS', 'buba-blocks' ), value: 'em' },
  { label: __( 'Regarding window FS', 'buba-blocks' ), value: 'rem' },
  { label: __( 'Window height', 'buba-blocks' ), value: 'vh' },
  { label: __( 'Window width', 'buba-blocks' ), value: 'vw' },
];

export default typesOfSize; 