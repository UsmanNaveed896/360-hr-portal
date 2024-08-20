import React, { useContext } from 'react';
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import { FaUsers } from 'react-icons/fa';
import { Home, Profile, Tables, Notifications } from '@/pages/dashboard';
import Permissions from './pages/dashboard/permissions';
import { SignUp } from '@/pages/auth';
import Operator from './pages/forms.jsx/operator';
import Conceirge from './pages/forms.jsx/conceirge';
import { MdAssignment, MdOutlineReduceCapacity, MdSupervisedUserCircle } from 'react-icons/md';
import PeerAmbassador from './pages/forms.jsx/peerAmbassador';
import ServicePartners from './pages/forms.jsx/servicePartners';
import { AuthContext } from './pages/auth/authecontext';
import AssignedForms from './pages/dashboard/assignedForms';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

const routes = () => {
  
  const { auth, role } = useContext(AuthContext);

  return [
    {
      layout: 'dashboard',
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: 'dashboard',
          path: '/home',
          element: <Home />,
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: 'Users',
          path: '/users',
          element: <Tables />,
          condition: role === 'superAdmin',
       
        },
        // {
        //   icon: <InformationCircleIcon {...icon} />,
        //   name: 'Permissions',
        //   path: '/roles',
        //   element: <Permissions />,
        //   condition: role === 'superAdmin',
        // },
        {
          icon: <TableCellsIcon {...icon} />,
          name: 'Operators',
          path: '/operator',
          element: <Operator />,
          condition: role === 'superAdmin' || role === 'operator' || role === 'admin',
        },
        {
          icon: <MdOutlineReduceCapacity {...icon} />,
          name: 'Concierge',
          path: '/concierge',
          element: <Conceirge />,
          condition: role === 'superAdmin' || role === 'concierge' || role === 'admin',
        },
        {
          icon: <MdSupervisedUserCircle {...icon} />,
          name: 'Peer Ambassador',
          path: '/peerAmbassador',
          element: <PeerAmbassador />,
          condition: role === 'superAdmin' || role === 'peerAmbassador' || role === 'admin',
        },
        {
          icon: <FaUsers {...icon} />,
          name: 'Service Partners',
          path: '/servicePartner',
          element: <ServicePartners />,
          condition: role === 'superAdmin' || role === 'servicePartner' || role === 'admin',

        },
        {
          icon: <MdAssignment  {...icon} />,
          name: 'Assign',
          path: '/assigned',
          element: <AssignedForms />,
          condition: role === 'superAdmin' || role === 'servicePartner' || role === 'admin',

        },
      ].filter(route => route.condition !== false), 
    },

  ];
};

export default routes;
