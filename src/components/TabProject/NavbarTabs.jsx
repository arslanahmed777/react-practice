import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
import Dashboard from "./tabcomponents/Dashboard";

function NavbarTabs(props) {
  const [activeTab, setactiveTab] = useState(1);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    setactiveTab(props.activeTab);
    setTabs(props.dynamicTabs);
  }, [props.activeTab]);

  return (
    <div className="container-fluid">
      {tabs.length > 0 ? (
        <>
          <TabContent activeTab={activeTab}>
            {tabs &&
              tabs.map((item) => {
                return (
                  <React.Fragment key={item.key}>
                    <TabPane tabId={item.key}>{item.component}</TabPane>
                  </React.Fragment>
                );
              })}
          </TabContent>
        </>
      ) : (
        <Dashboard /> // by default load Dashboard if no tabs exist
      )}
    </div>
  );
}

export default NavbarTabs;
