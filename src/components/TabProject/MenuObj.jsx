
// import Patient from "./tabcomponents/Patient";
// import Scheduler from "./tabcomponents/Scheduler";
// import Dashboard from "./tabcomponents/Dashboard";
// import Messages from "./tabcomponents/Messages";
const MenuObj = () => {
  return [
    {
      name: "Dashboard",
      key: 1,
      icon: "dashboard-icon svgiconsize18 ",

      right: true,
    },
    {
      name: "Scheduler",
      key: 2,
      icon: "calendar-icon svgiconsize18 ",

      right: false,
    },
    {
      name: "Patient",
      key: 3,
      icon: "patient-icon svgiconsize18 ",

      right: true,
    },

    {
      name: "Messages",
      key: 4,
      icon: "message-icon svgiconsize18 ",

      right: true,
    },
  ];
};

export default MenuObj;
