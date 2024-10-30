/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { TabPanel } from "@wordpress/components";

function ResponsiveTabPanel({
  desktop = <>Empty:(</>,
  tablet = <>Empty:(</>,
  mobile = <>Empty:(</>,
}) {
  return (
    <TabPanel
      className="col-tab-panel"
      activeClass="active-tab"
      tabs={[
        {
          name: "desktop",
          title: __("Desktop", "buba-blocks"),
          className: "desktop-tab",
        },
        {
          name: "tablet",
          title: __("Tablet", "buba-blocks"),
          className: "tablet-tab",
        },
        {
          name: "mobile",
          title: __("Mobile", "buba-blocks"),
          className: "mobile-tab",
        },
      ]}
    >
      {(tab) => (
        <div>
          {tab.name === "desktop" && desktop}
          {tab.name === "tablet" && tablet}
          {tab.name === "mobile" && mobile}
        </div>
      )}
    </TabPanel>
  );
}

export default ResponsiveTabPanel;
