/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {
    RichText,
    useBlockProps, InspectorControls,
} from '@wordpress/block-editor';

import {useEffect} from '@wordpress/element';


import {useSelect} from '@wordpress/data';

import {
    PanelBody,
    RangeControl,
    ToggleControl,
    PanelRow,
    FontSizePicker,
    Icon,
    ColorPalette, CheckboxControl, TabPanel, __experimentalUnitControl as UnitControl, SelectControl, ColorIndicator,
} from '@wordpress/components';
import fontSizes from "../../assets/fontSizes";
import {horizontalPaddingIcon, verticalPaddingIcon} from "../../assets/icons/icons";
import defaultColors from "../../assets/defaultColors";
import aligns from "../../assets/aligns";
import borderStyles from "../../assets/borderStyles";
import stringToSlug from "../../assets/stringToSlug";

const SpacingRangeControl = ({setAttributes, ...props}) => {

    const MIN_SPACING_VALUE = 0;
    const MAX_SPACING_VALUE = 100;
    let INITIAL_PADDING_POSITION = 30;
    if (props.name === 'horizontalMargin' || props.name === 'verticalMargin'){
        INITIAL_PADDING_POSITION = 0;
    } else {
        INITIAL_PADDING_POSITION = 30;
    }



    const setPadding = (newPaddingValue) => {
        let name = props.name;
        if (newPaddingValue === undefined)
            setAttributes({
                [name]: INITIAL_PADDING_POSITION
            });
        else setAttributes({[name]: newPaddingValue});
    }

    return (
        <RangeControl
            value={props.value}
            label={<Icon icon={props.icon}/>}
            min={MIN_SPACING_VALUE}
            max={MAX_SPACING_VALUE}
            initialPosition={INITIAL_PADDING_POSITION}
            allowReset
            onChange={setPadding}
        />
    )

}

function Edit({attributes, setAttributes}) {
    const {
        include_h1,
        include_h2,
        include_h3,
        include_h4,
        include_h5,
        include_h6,
        title,
        titleColor,
        titleFontSize,
        titleBottomSpacing,
        titleAlign,
        horizontalPadding,
        verticalPadding,
        backgroundColor,
        customWidth,
        desktopWidth,
        tabletWidth,
        mobileWidth,
        contentFontSize,
        contentColor,
        contentAlign,
        borderStyle,
        borderWidth,
        borderRadius,
        borderColor,
        headersItems,
        verticalMargin,
        horizontalMargin,
    } = attributes;

    const blockProps = useBlockProps();

    const blockCount = useSelect((select) => {
        return select('core/block-editor').getBlocks().filter(block => block.name === 'core/heading').length;
    }, []);
    const blocksHeading = useSelect((select) => {
         return select('core/block-editor').getBlocks().filter(block => block.name === 'core/heading');
    },[]);

    useEffect(() => {

        if (blocksHeading.length > 0 ) {
            const allowLevels = [
                include_h1 ? 1 : undefined,
                include_h2 ? 2 : undefined,
                include_h3 ? 3 : undefined,
                include_h4 ? 4 : undefined,
                include_h5 ? 5 : undefined,
                include_h6 ? 6 : undefined,
            ];
            let updatedHeadings = blocksHeading.filter((heading) => {
                let level = heading.attributes.level;
                if (allowLevels.includes(level)) {
                    return {
                        heading
                    }
                }

            });
            setAttributes({
                headersItems: updatedHeadings.map((heading) => {
                    let slug = stringToSlug(heading.attributes.content);
                    let text = heading.attributes.content
                                .replace(/<\/strong>/,'')
                                .replace(/<strong>/,'');
                    let level = heading.attributes.level;
                    if (allowLevels.includes(level)) {
                        return {
                            level,
                            slug,
                            text
                        }
                    }

                })
            });
        }
        setAttributes({
            headersCount: blockCount
        });

    }, [blocksHeading,include_h1,include_h2,include_h3,include_h4,include_h5,include_h6]);


    const fallbackFontSize = 16;

    const units = [
        {value: '%', label: '%', default: 100},
        {value: 'px', label: 'px', default: 0},
        {value: 'em', label: 'em', default: 0},
        {value: 'vh', label: 'vh', default: 0},
    ];

    const setWidth = (newWidth) => {
        setAttributes({
            desktopWidth: newWidth
        })
    }




    return (
        <>
            <InspectorControls>
                <PanelBody title={__('General settings', 'buba-blocks')} className="buba-table-of-contents__panel-settings">
                    <h2>{__('Select the heading to consider when generating the table', 'buba-blocks')}</h2>
                    <PanelRow>
                        <ToggleControl
                            label={__('H1', 'buba-blocks')}
                            checked={include_h1}
                            onChange={() =>
                                setAttributes({
                                    include_h1: !include_h1
                                })
                            }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('H2', 'buba-blocks')}
                            checked={include_h2}
                            onChange={() =>
                                setAttributes({
                                    include_h2: !include_h2
                                })
                            }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('H3', 'buba-blocks')}
                            checked={include_h3}
                            onChange={() =>
                                setAttributes({
                                    include_h3: !include_h3
                                })
                            }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('H4', 'buba-blocks')}
                            checked={include_h4}
                            onChange={() =>
                                setAttributes({
                                    include_h4: !include_h4
                                })
                            }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('H5', 'buba-blocks')}
                            checked={include_h5}
                            onChange={() =>
                                setAttributes({
                                    include_h5: !include_h5
                                })
                            }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('H6', 'buba-blocks')}
                            checked={include_h6}
                            onChange={() =>
                                setAttributes({
                                    include_h6: !include_h6
                                })
                            }
                        />
                    </PanelRow>
                    <p>{__('Background', 'buba-blocks')} {backgroundColor && <ColorIndicator colorValue={backgroundColor}/>}</p>
                    <ColorPalette
                        colors={defaultColors}
                        value={backgroundColor}
                        onChange={(color) => {
                            setAttributes({
                                backgroundColor: color
                            })
                        }}
                    />
                    <h2>{__('Padding', 'buba-blocks')}</h2>
                    <SpacingRangeControl
                        name={'verticalPadding'}
                        value={verticalPadding}
                        icon={verticalPaddingIcon}
                        setAttributes={setAttributes}
                    />
                    <SpacingRangeControl
                        name={'horizontalPadding'}
                        value={horizontalPadding}
                        icon={horizontalPaddingIcon}
                        setAttributes={setAttributes}
                    />
                    <h2>{__('Margin', 'buba-blocks')}</h2>
                    <SpacingRangeControl
                        name={'horizontalMargin'}
                        value={horizontalMargin}
                        icon={horizontalPaddingIcon}
                        setAttributes={setAttributes}
                    />
                    <SpacingRangeControl
                        name={'verticalMargin'}
                        value={verticalMargin}
                        icon={verticalPaddingIcon}
                        setAttributes={setAttributes}
                    />
                    <h2>{__('Border', 'buba-blocks')}</h2>
                    <SelectControl
                        label={__('Border style', 'buba-blocks')}
                        value={borderStyle}
                        onChange={(borderStyle) => {
                            setAttributes({
                                borderStyle
                            })
                        }}
                        options={borderStyles}
                    />
                    {
                        borderStyle !== 'none' && (
                            <>
                                <RangeControl
                                    value={borderWidth}
                                    label={__('Border width', 'buba-blocks')}
                                    min={0}
                                    max={20}
                                    allowReset
                                    onChange={(borderWidth) => {
                                        setAttributes({
                                            borderWidth
                                        })
                                    }}
                                />
                                <RangeControl
                                    value={borderRadius}
                                    label={__('Border radius', 'buba-blocks')}
                                    min={0}
                                    max={1000}
                                    allowReset
                                    onChange={(borderRadius) => {
                                        setAttributes({
                                            borderRadius
                                        })
                                    }}
                                />
                                <p>{__('Border color', 'buba-blocks')} {borderColor && <ColorIndicator colorValue={borderColor}/>}</p>
                                <ColorPalette
                                    colors={defaultColors}
                                    value={borderColor}
                                    onChange={(borderColor) => {
                                        setAttributes({borderColor});
                                    }}
                                />
                            </>
                        )
                    }
                    <ToggleControl
                        label={__('Custom Width', 'buba-blocks')}
                        help={customWidth ? __('Width will be auto if this is kept off.', 'buba-blocks') : __('No custom width.', 'buba-blocks')}
                        checked={customWidth}
                        onChange={() => {
                            setAttributes({
                                customWidth: !customWidth
                            })
                        }}
                    />
                    {
                        customWidth && (
                            <TabPanel className="height-tab-panel"
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
                                                <UnitControl
                                                    units={units}
                                                    label={__('Width', 'buba-blocks')}
                                                    onChange={setWidth}
                                                    value={desktopWidth}/>
                                            )}
                                            {tab.name === 'tablet' && (
                                                <CheckboxControl
                                                    label="Reset width on tablet"
                                                    checked={tabletWidth}
                                                    onChange={() => {
                                                        setAttributes({tabletWidth: !tabletWidth})
                                                    }}
                                                />
                                            )}
                                            {tab.name === 'mobile' && (
                                                <CheckboxControl
                                                    label="Reset width on mobile"
                                                    checked={mobileWidth}
                                                    onChange={() => {
                                                        setAttributes({mobileWidth: !mobileWidth})
                                                    }}
                                                />
                                            )}
                                        </div>
                                }
                            </TabPanel>
                        )
                    }
                </PanelBody>
                <PanelBody title={__('Content', 'buba-blocks')} initialOpen={false}>
                    <h2>{__('Heading', 'buba-blocks')}</h2>
                    <FontSizePicker
                        fontSizes={fontSizes}
                        value={titleFontSize}
                        fallbackFontSize={fallbackFontSize}
                        onChange={(newFontSize) => {
                            setAttributes({titleFontSize: newFontSize});
                        }}
                    />
                    <SelectControl
                        label={__('Title align', 'buba-blocks')}
                        value={titleAlign}
                        onChange={(align) => {
                            setAttributes({
                                titleAlign: align
                            })
                        }}
                        options={aligns}
                    />
                    <RangeControl
                        value={titleBottomSpacing}
                        label={__('Bottom Space', 'buba-blocks')}
                        min={0}
                        max={50}
                        allowReset
                        onChange={(value) => {
                            setAttributes({
                                titleBottomSpacing: value
                            })
                        }}
                    />
                    <p>{__('Title color', 'buba-blocks')} {titleColor && <ColorIndicator colorValue={titleColor}/>}</p>
                    <ColorPalette
                        colors={defaultColors}
                        value={titleColor}
                        onChange={(color) => {
                            setAttributes({titleColor: color});
                        }}
                    />
                    <h2>{__('Content', 'buba-blocks')}</h2>
                    <FontSizePicker
                        fontSizes={fontSizes}
                        value={contentFontSize}
                        fallbackFontSize={fallbackFontSize}
                        onChange={(newFontSize) => {
                            setAttributes({contentFontSize: newFontSize});
                        }}
                    />
                    <p>{__('Content color')} {contentColor && <ColorIndicator colorValue={contentColor}/>}</p>
                    <ColorPalette
                        colors={defaultColors}
                        value={contentColor}
                        onChange={(color) => {
                            setAttributes({contentColor: color});
                        }}
                    />
                    <SelectControl
                        label={__('Content align', 'buba-blocks')}
                        value={contentAlign}
                        onChange={(align) => {
                            setAttributes({
                                contentAlign: align
                            })
                        }}
                        options={aligns}
                    />
                </PanelBody>
            </InspectorControls>
            <div
                { ...blockProps }
                className={classnames('buba-table-of-contents',blockProps.className, {
                'width-reset-tablet': tabletWidth,
                'width-reset-mobile': mobileWidth,
            },

            )}
                 style={{
                     paddingTop: verticalPadding ? verticalPadding + 'px' : undefined,
                     paddingBottom: verticalPadding ? verticalPadding + 'px' : undefined,
                     paddingRight: horizontalPadding ? horizontalPadding + 'px' : undefined,
                     paddingLeft: horizontalPadding ? horizontalPadding + 'px' : undefined,
                     marginTop: verticalMargin ? verticalMargin + 'px' : undefined,
                     marginBottom: verticalMargin ? verticalMargin + 'px' : undefined,
                     marginRight: horizontalMargin ? horizontalMargin + 'px' : undefined,
                     marginLeft: horizontalMargin ? horizontalMargin + 'px' : undefined,
                     backgroundColor: backgroundColor ? backgroundColor : undefined,
                     width: customWidth && desktopWidth ? desktopWidth : undefined,
                     borderStyle: borderStyle !=='none' ? borderStyle : undefined,
                     borderWidth: borderStyle !=='none' && borderWidth ? borderWidth + 'px' : undefined,
                     borderRadius: borderStyle !=='none' && borderRadius ? borderRadius + 'px' : undefined,
                     borderColor: borderColor ? borderColor : undefined,
                     ...blockProps.style,
                 }}
            >
                <RichText
                    classname="buba-table-of-contents__title"
                    tagName="div"
                    style={{
                        fontSize: titleFontSize ? titleFontSize + 'px' : undefined,
                        color: titleColor ? titleColor : undefined,
                        marginBottom: titleBottomSpacing ? titleBottomSpacing : undefined,
                        textAlign: titleAlign,
                    }}
                    value={title}
                    onChange={(title) => setAttributes({title: title})}
                />
                <ul className="buba-table-of-contents__list">
                    {
                        headersItems &&
                        headersItems.map((block, id) => {
                            return (
                                <li key={'key'+id} className="buba-table-of-contents__list-item"
                                    style={{
                                        textAlign: contentAlign ? contentAlign : undefined,
                                    }}
                                >
                                    <a href={'#'+block.slug}
                                       data-link={block.slug}
                                       data-level={block.level}
                                       style={{
                                           fontSize: contentFontSize ? contentFontSize : undefined,
                                           color: contentColor ? contentColor : undefined,
                                       }}
                                       className="buba-table-of-contents__list-link"
                                    >
                                        {block.text}
                                    </a>
                                </li>
                            )

                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Edit;