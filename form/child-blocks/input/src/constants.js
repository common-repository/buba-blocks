import { __ } from '@wordpress/i18n';

export const inputTypes = [
  { label: __( 'Text', 'buba-blocks' ), value: 'text' },
  { label: __( 'Number', 'buba-blocks' ), value: 'number' },
  { label: __( 'Url', 'buba-blocks' ), value: 'url' },
];

export const normalSettings = {
  inputType: 'text',
  field_name: '',
  required: false
};