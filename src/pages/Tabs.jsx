import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import MenuObj from "../components/TabProject/MenuObj";
// import Dashboard from "../components/TabProject/tabcomponents/Dashboard";
// import Messages from "../components/TabProject/tabcomponents/Messages";
// import Patient from "../components/TabProject/tabcomponents/Patient";
// import NavbarTabs from "../components/TabProject/NavbarTabs";

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.menuItems = MenuObj();
    this.state = {
      menuItems: this.menuItems,
      dynamicTabs: [],
      activeTab: "1",
    };
  }

  handleMenuItemClick = (key, name, component) => {
    this.setState({
      activeTab: key.toString()
    })
  };

  componentDidMount() {
    if (this.menuItems[0].right) {
      import("../components/TabProject/tabcomponents/Dashboard").then(comsp => {

        this.setState({
          dynamicTabs: [...this.state.dynamicTabs, { component: comsp.default, key: "1" }]
        })

      });
    }
    if (this.menuItems[2].right) {
      import("../components/TabProject/tabcomponents/Patient").then(cosmp => {
        this.setState({
          dynamicTabs: [...this.state.dynamicTabs, { component: cosmp.default, key: "3" }]
        })
      })
    }
  }


  render() {
    const { menuItems, dynamicTabs, activeTab } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%" }}>
          <nav>
            <Nav tabs style={{ flexDirection: "column" }}>
              {menuItems
                .filter((obj) => obj.right === true)
                .map((menuitem) => {
                  return (
                    <NavItem key={menuitem.key} style={activeTab === menuitem.key ? { background: "#b8fdf8" } : {}} >
                      <NavLink onClick={() => this.handleMenuItemClick(menuitem.key, menuitem.name, menuitem.component)} >
                        <span>{menuitem.name}</span>
                      </NavLink>
                    </NavItem>
                  );
                })}
            </Nav>
          </nav>
        </div>
        <div style={{ width: "70%" }}>
          {/* {dynamicTabs.map((p) => {
            return (
              <p>{p.key}</p>
            )
          })} */}
          <TabContent activeTab={activeTab}>
            {/* <NavbarTabs dynamicTabs={dynamicTabs} activeTab={activeTab} /> */}
            {/* <TabPane tabId="1"><Dashboard /></TabPane>
            <TabPane tabId="3"><Patient /></TabPane>
            <TabPane tabId="4"><Messages /></TabPane> */}
            {dynamicTabs ? (
              dynamicTabs.map((tabs) => {

                return (
                  <TabPane tabId={tabs.key}> {<tabs.component />}</TabPane>
                )
              })) : null}
          </TabContent>
        </div>
      </div>
    );
  }
}
