import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "",
      data: [5, 15, 10, 20, 30, 25, 35, 40, 50],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [5, 15, 10, 20, 30, 25, 35, 40, 50],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [5, 15, 10, 20, 30, 25, 35, 40, 50],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Users",
    chart: websiteViewsChart,
    roles: ["superAdmin"], 
  },
  {
    color: "white",
    title: "Operators",
    // description: "15% increase in today sales",
    // footer: "updated 4 min ago",
    chart: dailySalesChart,
    roles: ["superAdmin"], 
  },
  {
    color: "white",
    title: "Concierge",
    // description: "Last Campaign Performance",
    // footer: "just updated",
    chart: completedTasksChart,
    roles: ["superAdmin"], 
  },
  {
    color: "white",
    title: "Peer Ambassador",
    // description: "Last Campaign Performance",
    // footer: "campaign sent 2 days ago",
    chart: websiteViewsChart,
    roles: ["superAdmin"], 
  },
  {
    color: "white",
    title: "Service Partner",
    // description: "15% increase in today sales",
    // footer: "updated 4 min ago",
    chart: dailySalesChart,
    roles: ["superAdmin"], 
  },
  {
    color: "white",
    title: "Operators",
    // description: "15% increase in today sales",
    // footer: "updated 4 min ago",
    chart: dailySalesChart,
    roles: ["operator"], 
  },
  {
    color: "white",
    title: "Peer Ambassador",
    // description: "15% increase in today sales",
    // footer: "updated 4 min ago",
    chart: dailySalesChart,
    roles: ["peerAmbassador"], 
  },
  {
    color: "white",
    title: "Concierge",
    // description: "15% increase in today sales",
    // footer: "updated 4 min ago",
    chart: dailySalesChart,
    roles: ["concierge"], 
  },
];

export default statisticsChartsData;
