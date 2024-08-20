import React, { useState } from 'react';
import { Card, Typography } from "@material-tailwind/react";

const permissionsList = [
  "User Management",
  "Content Management",
  "Donation Management",
  "Application Processing",
  "View Personal Profile",
  "Edit Personal Profile",
  "Generate Reports",
  "Handle Donor Inquiries",
  "Review New Applications",
  "Approve New Applicants",
  "Communicate with Applicants",
  "Moderate User-Generated Content",
  "Access Financial Reports",
  "Access Assigned Operator Profiles",
  "Add Notes/Files",
  "Assign Operators to Peer Ambassadors"
];

const roles = [
  {
    role: 'Super Admin',
    permissions: ["User Management", "Content Management", "Donation Management", "Application Processing", "Generate Reports", "Handle Donor Inquiries", "Review New Applications", "Approve New Applicants", "Communicate with Applicants", "Moderate User-Generated Content", "Access Financial Reports", "Access Assigned Operator Profiles", "Add Notes/Files", "Assign Operators to Peer Ambassadors"],
  },
  {
    role: 'Admin',
    permissions: ["User Management", "Content Management", "Donation Management", "Application Processing", "Review New Applications", "Approve New Applicants"],
  },
  {
    role: 'Content Manager',
    permissions: ["Content Management", "Moderate User-Generated Content"],
  },
  {
    role: 'Donation Manager',
    permissions: ["Donation Management", "Generate Reports", "Handle Donor Inquiries", "Access Financial Reports"],
  },
  {
    role: 'Application Manager',
    permissions: ["Application Processing", "Review New Applications", "Communicate with Applicants"],
  },
  {
    role: 'Operator (Client)',
    permissions: ["View Personal Profile", "Edit Personal Profile"],
  },
  {
    role: 'Peer Ambassador',
    permissions: ["Access Assigned Operator Profiles", "Add Notes/Files"],
  },
  {
    role: 'Concierge',
    permissions: ["Access Assigned Operator Profiles", "Add Notes/Files", "Assign Operators to Peer Ambassadors"],
  }
];

const Permissions = () => {
  const [rolesState, setRolesState] = useState(roles);

  const handleCheckboxChange = (roleIndex, permission) => {
    const updatedRoles = [...rolesState];
    const role = updatedRoles[roleIndex];
    if (role.permissions.includes(permission)) {
      role.permissions = role.permissions.filter((perm) => perm !== permission);
    } else {
      role.permissions.push(permission);
    }
    setRolesState(updatedRoles);
  };

  return (
    <Card className="h-full w-full overflow-scroll mt-8">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                Role
              </Typography>
            </th>
            {permissionsList.map((permission) => (
              <th key={permission} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {permission}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rolesState.map((role, roleIndex) => {
            const isLast = roleIndex === rolesState.length - 1;
            const rowClass = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={role.role}>
                <td className={rowClass}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {role.role}
                  </Typography>
                </td>
                {permissionsList.map((permission) => (
                  <td key={permission} className={rowClass}>
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(permission)}
                      onChange={() => handleCheckboxChange(roleIndex, permission)}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default Permissions;