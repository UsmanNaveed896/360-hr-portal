import { TableCellsIcon, UsersIcon } from "@heroicons/react/24/solid";
import { MdOutlineReduceCapacity, MdAttachMoney, MdSupervisedUserCircle } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Users",
    value: "2,300",
    footer: {
      color: "text-green-500",
      label: "Users",
    },
    // roles: ["superAdmin"], 
  },
  {
    color: "gray",
    icon: MdOutlineReduceCapacity,
    title: "Concierge",
    value: "$53k",
    footer: {
      color: "text-green-500",
      label: "Concierge",
    },
    // roles: ["superAdmin"], 
  },
  {
    color: "gray",
    icon: TableCellsIcon,
    title: "Operators",
    value: "$120k",
    footer: {
      color: "text-red-500",
      label: "Operators",
    },
    // roles: ["superAdmin"], 
  },
  {
    color: "gray",
    icon: MdSupervisedUserCircle,
    title: "Peer Ambassadors",
    value: "340",
    footer: {
      color: "text-blue-500",
      label: "Peer Ambassadors",
    },
    // roles: ["superAdmin"], 
  },
  {
    color: "gray",
    icon: MdSupervisedUserCircle,
    title: "Service Partners",
    value: "340",
    footer: {
      color: "text-blue-500",
      label: "Service Partners",
    },
    // roles: ["superAdmin"], 
  },
  {
    color: "gray",
    icon: TableCellsIcon,
    title: "Operators",
    value: "$120k",
    footer: {
      color: "text-red-500",
      label: "Operators",
    },
    roles: ["operator"], 
  },
  {
    color: "gray",
    icon: TableCellsIcon,
    title: "Currently Employed",
    value: "$120k",
    footer: {
      color: "text-red-500",
      label: "Operators",
    },
    roles: ["operator"], 
  },
  {
    color: "gray",
    icon: TableCellsIcon,
    title: "Peer Ambassador",
    value: "$120k",
    footer: {
      color: "text-red-500",
      label: "Operators",
    },
    roles: ["peerAmbassador"], 
  },
  {
    color: "gray",
    icon: TableCellsIcon,
    title: "",
    value: "$120k",
    footer: {
      color: "text-red-500",
      label: "Operators",
    },
    roles: ["peerAmbassador"], 
  },
  {
    color: "gray",
    icon: TableCellsIcon,
    title: "Currently Employed",
    value: "$120k",
    footer: {
      color: "text-red-500",
      label: "Operators",
    },
    roles: ["concierge"], 
  },
  {
    color: "gray",
    icon: TableCellsIcon,
    title: "Currently Employed",
    value: "$120k",
    footer: {
      color: "text-red-500",
      label: "Operators",
    },
    roles: ["concierge"], 
  },
];
