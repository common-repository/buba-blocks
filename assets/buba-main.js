const {
  doAction
} = wp.hooks;


document.addEventListener( 'click', e => {
  const hookName = 'buba_blocks_editor_click';
  doAction( hookName, e );
}, false);


jQuery(document).ready(function ($) {

});
