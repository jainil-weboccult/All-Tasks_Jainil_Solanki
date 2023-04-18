const data = [
  {
    id: 1,
    name: "Time Tracker",
    path: "/timetracker",
    hasChildren: true,
    children: [
      {
        id: 1,
        name: "Time Log",
        path: "/timetracker/timelog",
      },
      {
        id: 2,
        name: "Time-sheet",
        path: "/timetracker/time-sheet"
      },
      {
        id: 3,
        name: "Request Extra Staffing",
        path: "/timetracker/res",
      },
    ],
  },

  {
    id: 2,
    name: "Company Policy",
    path: "/companypolicy",
    hasChildren: false,
  },

  {
    id: 3,
    name: "Leave Mgmt.",
    path: "/leave-management",
    hasChildren: true,
    children: [
      {
        id: 1,
        name: "Leaves",
        path: "/leave-management/leaves",
      },
      {
        id: 2,
        name: "Leave Report",
        path: "/leave-management/leave-report",
      },
    ],
  },

  {
    id: 4,
    name: "Payroll",
    path: "/payroll",
    hasChildren: true,
    children: [
      {
        id: 1,
        name: "Salary Slip",
        path: "/payroll/slip",
      },
    ],
  },

  {
    id: 5,
    name: "Holiday Management",
    path: "/holiday-mgmt",
    hasChildren: false,
  },

  {
    id: 6,
    name: "Password Management",
    path: "/passwordmanagement",
    hasChildren: false,
  },
  
  {
    id: 7,
    name: "HRMS V2.0 ",
    path: "/New_HRMS",
    hasChildren: false,
  },
];

export default data;
