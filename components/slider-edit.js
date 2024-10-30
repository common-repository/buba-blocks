/**
 * External dependencies
 */
import Slick from 'react-slick';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { 
  RangeControl,
  PanelBody,
  ToggleControl,
  __experimentalNumberControl as NumberControl,
  TabPanel
} from '@wordpress/components';

import SliderArrows, { GetReactArrow, GetHTMLArrow } from './slider-arrows';

function SliderEdit(props) {
  const [setting, setSetting] = useState(props.value ? props.value : {
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 10,
    dots: false,
    arrows: false,
    centerMode: false,
    centerPadding: '50px',
    infinite: false,
    fade: false,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false,
            arrows: false
        }
      },
      {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false
        }
      }
    ]
  });

  const [arrows, setArrows] = useState(setting.arrowsStyle ? setting.arrowsStyle : {
    '--size': '20px',
    '--color': '#000',
    '--color-hover': '#000',
    '--transition': '300ms'
  });

  useEffect(() => {
    setSetting({
      ...setting, 
      arrowsStyle: arrows
    });
  }, [arrows]);

  useEffect( () => {
    props.onChange(GetHTMLArrow(setting));
  }, [setting]);

  const getResponsiveParams = (params) => {
    let obj = setting.responsive;

    const setKeyParams = (value, num) => {
      if (typeof params.key === 'string') {
        obj[num]['settings'][params.key] = value;
      } else {
        params.key.map(key => {
          obj[num]['settings'][key] = value;
        });
      }
    };

    if (typeof params.num === 'number') {
      setKeyParams(params.value, params.num);
    } else {
      params.num.map(num => {
        setKeyParams(params.value, num);
      });
    }

    return obj;
  };

  return (
    <PanelBody title={ __('Slider setting', 'buba-blocks') } initialOpen={false}>
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
                <>
                  <RangeControl
                    label={ __( 'Slides to show', 'buba-blocks' ) }
                    value={ setting.slidesToShow }
                    onChange={ value => setSetting({...setting, slidesToShow: setting.fade ? 1 : value}) }
                    min={ 1 }
                    max={ 6 }
                  />
                  {setting.slidesToShow > 1 && (
                    <RangeControl
                      label={ __( 'Slides to scroll', 'buba-blocks' ) }
                      value={ setting.slidesToScroll }
                      onChange={ value => setSetting({...setting, slidesToScroll: setting.fade ? 1 : value}) }
                      min={ 1 }
                      max={ setting.slidesToShow }
                    />
                  )}
                </>
              )}
              {tab.name === 'tablet' && (
                <>
                  <RangeControl
                    label={ __( 'Slides to show', 'buba-blocks' ) }
                    value={ setting.responsive[0].settings.slidesToShow }
                    onChange={ value => setSetting(
                      {
                        ...setting,  
                        responsive: getResponsiveParams({
                          num: 0,
                          key: 'slidesToShow',
                          value: setting.fade ? 1 : value,
                        })
                      }
                    ) }
                    min={ 1 }
                    max={ 6 }
                  />
                  {setting.responsive[0].settings.slidesToShow > 1 && (
                    <RangeControl
                      label={ __( 'Slides to scroll', 'buba-blocks' ) }
                      value={ setting.responsive[0].settings.slidesToScroll }
                      onChange={ value => setSetting(
                        {
                          ...setting,  
                          responsive: getResponsiveParams({
                            num: 0,
                            key: 'slidesToScroll',
                            value: setting.fade ? 1 : value,
                          })
                        }
                      ) }
                      min={ 1 }
                      max={ setting.responsive[0].settings.slidesToShow }
                    />
                  )}
                </>
              )}
              {tab.name === 'mobile' && (
                <>
                  <RangeControl
                    label={ __( 'Slides to show', 'buba-blocks' ) }
                    value={ setting.responsive[1].settings.slidesToShow }
                    onChange={ value => setSetting({
                      ...setting,
                      responsive: getResponsiveParams({
                        num: 1,
                        key: 'slidesToShow',
                        value: setting.fade ? 1 : value,
                      })
                    }) }
                    min={ 1 }
                    max={ 6 }
                  />
                  {setting.responsive[1].settings.slidesToShow > 1 && (
                    <RangeControl
                      label={ __( 'Slides to scroll', 'buba-blocks' ) }
                      value={ setting.responsive[1].settings.slidesToScroll }
                      onChange={ value => setSetting({
                        ...setting,
                        responsive: getResponsiveParams({
                          num: 1,
                          key: 'slidesToScroll',
                          value: setting.fade ? 1 : value,
                        })
                      }) }
                      min={ 1 }
                      max={ setting.responsive[1].settings.slidesToShow }
                    />
                  )}
                </>
              )}
            </div>
        }
      </TabPanel>
      <hr style={{marginTop: '10px', marginBottom: '10px'}}></hr>
      <NumberControl
        label={ __('Speed', 'buba-blocks') }
        isShiftStepEnabled={ true }
        onChange={ speed => setSetting({...setting, speed}) }
        shiftStep={ 100 }
        value={ setting.speed }
        step={ 100 }
      />
      <RangeControl
        label={ __( 'Gap between slider elements', 'buba-blocks' ) }
        value={ setting.gap }
        onChange={ gap => setSetting({...setting, gap}) }
        min={ 0 }
        max={ 60 }
      />
      <ToggleControl
        label={__('Dots navigation', 'buba-blocks')}
        checked={ setting.dots }
        onChange={ dots => setSetting({...setting, dots}) }
      />
      <ToggleControl
        label={__('Arrows navigation', 'buba-blocks')}
        checked={ setting.arrows }
        onChange={ arrows => setSetting({...setting, arrows}) }
      />
      {setting.arrows && (
        <div style={{marginBottom: '20px'}}>
          <SliderArrows 
            value={arrows}
            onChange={setArrows}
          />
        </div>
      )}
      <ToggleControl
        label={__('Infinite', 'buba-blocks')}
        checked={ setting.infinite }
        onChange={ infinite => setSetting({...setting, infinite}) }
      />
      <ToggleControl
        label={__('Center mode', 'buba-blocks')}
        checked={ setting.centerMode }
        onChange={ centerMode => setSetting({...setting, centerMode}) }
      />
      {setting.centerMode && (
        <RangeControl
          label={ __( 'Center padding', 'buba-blocks' ) }
          value={ setting.centerPadding }
          onChange={ centerPadding => setSetting({...setting, centerPadding}) }
          min={ 0 }
          max={ 100 }
        />
      )}
      <ToggleControl
        label={__('Fade', 'buba-blocks')}
        checked={ setting.fade }
        onChange={ fade => setSetting({
          ...setting, 
          fade,
          slidesToScroll: 1,
          slidesToShow: 1,
          responsive: getResponsiveParams({
            num: [0,1],
            key: ['slidesToShow', 'slidesToScroll'],
            value: 1
          })
        }) }
      />
      <ToggleControl
        label={__('Autoplay', 'buba-blocks')}
        checked={ setting.autoplay }
        onChange={ autoplay => setSetting({...setting, autoplay}) }
      />
      {setting.autoplay && (
        <NumberControl
          label={__('Autoplay speed', 'buba-blocks')}
          isShiftStepEnabled={true}
          onChange={ autoplaySpeed => setSetting({...setting, autoplaySpeed}) }
          shiftStep={500}
          value={ setting.autoplaySpeed }
          step={500}
        />
      )}
    </PanelBody>
  )
}

function Slider(props) {
  const innerSetting = {...props.setting};

  innerSetting.prevArrow = <GetReactArrow customStyle={innerSetting.arrowsStyle}/>;
  innerSetting.nextArrow = <GetReactArrow customStyle={innerSetting.arrowsStyle}/>;

  const sliderClasses = props.className ? props.className + ' buba-blocks-slider' : 'buba-blocks-slider';
  
  return (
    <Slick 
      className={sliderClasses} 
      style={{
        '--gap': innerSetting.gap + 'px'
      }}
      {...innerSetting}
    >
      {props.children}
    </Slick>
  );
}

export { 
  Slider, 
  SliderEdit 
};