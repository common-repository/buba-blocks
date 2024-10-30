/**
 * WordPress dependencies
 */
import {
  PanelBody,
  RangeControl,
  TabPanel,
  ToggleControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n'
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
  MASONRY_POSTS_COLUMNS
} from './constants';

/**
 * Component constants
 */
const MIN_COLUMNS = 1;
const MAX_COLUMNS = 6;

function MasonryEdit(props) {
  const {
    setAttributes,
    attributes
  } = props.value;

  const {
    desktopColumns,
    tableColumns,
    mobileColumns,
    postLayout,
    isText,
    masonryGap
  } = attributes;

  useEffect( () => {
    props?.gap?.current?.style?.setProperty('--masonry-gap', masonryGap + 'px');
  }, [masonryGap] );

  useEffect( () => {
    setAttributes({ 
      desktopColumns: desktopColumns ? desktopColumns : MASONRY_POSTS_COLUMNS,
      tableColumns: tableColumns ? tableColumns : desktopColumns,
      mobileColumns: mobileColumns ? mobileColumns : tableColumns,
    });
  }, [] );

  return (
    <>
      {postLayout === 'masonry' && (
        <PanelBody title={__('Masonry settings', 'buba-blocks')} initialOpen={false} >
          <div style={{marginBottom: '20px'}}>
            <TabPanel className="col-tab-panel"
              activeClass="active-tab"
              tabs={[
                  {
                      name: 'desktop',
                      title: __('Desktop', 'buba-blocks'),
                      className: 'desktop-tab',
                  },
                  {
                      name: 'tablet',
                      title: __('Tablet', 'buba-blocks'),
                      className: 'tablet-tab',
                  },
                  {
                      name: 'mobile',
                      title: __('Mobile', 'buba-blocks'),
                      className: 'mobile-tab',
                  },
              ]}>
              {
                (tab) =>
                  <div>
                    {tab.name === 'desktop' && (
                      <RangeControl
                        label={__('Number of columns', 'buba-blocks')}
                        value={ desktopColumns }
                        onChange={ desktopColumns => setAttributes( { desktopColumns } ) }
                        min={ MIN_COLUMNS }
                        max={ MAX_COLUMNS }
                      />
                    )}
                    {tab.name === 'tablet' && (
                      <RangeControl
                        label={__('Number of columns', 'buba-blocks')}
                        value={ tableColumns }
                        onChange={ tableColumns => setAttributes( { tableColumns } ) }
                        min={ MIN_COLUMNS }
                        max={ MAX_COLUMNS }
                      />
                    )}
                    {tab.name === 'mobile' && (
                      <RangeControl
                        label={__('Number of columns', 'buba-blocks')}
                        value={ mobileColumns }
                        onChange={ mobileColumns => setAttributes( { mobileColumns } ) }
                        min={ MIN_COLUMNS }
                        max={ MAX_COLUMNS }
                      />
                    )}
                  </div>
              }
            </TabPanel>
          </div>
          <ToggleControl
            label={__('Have a title?', 'buba-blocks')}
            checked={ isText }
            onChange={ isText => setAttributes({isText}) }
          />
          <RangeControl
            label={__('Masonry gap', 'buba-blocks')}
            value={ masonryGap }
            onChange={ masonryGap => setAttributes( { masonryGap } ) }
            min={ 0 }
            max={ 60 }
          />
        </PanelBody>
      )}
    </>
  );
}

export default MasonryEdit;