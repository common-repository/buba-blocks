class BubaLoader {
  // The element to add to the DOM
  elem;

  /*
   * This loader will be like the bootloader
   * You can change this loader using the hook
   */
  bootloader = `
    <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
      <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.1"/>    
      </circle>
      <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite" 
        begin="0.2"/>       
      </circle>
      <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite" 
        begin="0.3"/>     
      </circle>
    </svg>
  `;

  /*
   * The name of the hook that will change the bootloader
   */
  changeHookName = 'buba_blocks_change_loader';


  // Node element in DOM
  LoaderNODE;


  constructor( elem, bootloader = false ) {
    this.elem = document.querySelector( elem || 'body' );

    if ( bootloader )
      this.bootloader = bootloader;

    this.start();
  }

  /* 
   * Hook: if there are hooks and seated hook parameters, will use a configurable bootloader
   */
  useLoader() {
    wp?.hooks?.doAction( this.changeHookName, newLoader => this.bootloader = newLoader );
    return this.bootloader;
  }

  start() {
    this.LoaderNODE = document.createElement('div');

    this.LoaderNODE.setAttribute( 'id', 'buba-blocks-loader' );
    this.LoaderNODE.innerHTML = this.useLoader();
    
    return this.elem.prepend( this.LoaderNODE );
  }

  delete() {
    this.LoaderNODE.remove();
  }
}