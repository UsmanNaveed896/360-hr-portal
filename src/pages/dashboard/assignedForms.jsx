

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { DataGrid } from "@mui/x-data-grid";
import { Puff } from "react-loader-spinner";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import DummyConcierge from "@/components/dummy-concerige";

const AssignedForms = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

 
  const dummyData = [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      DOB: "1985-10-10",
      airForceAfSoc: "AirForce",
      EOD: "Combat Controller/TACP",
      currentlyEmployed: true,
      location: "Location A",
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Smith",
      DOB: "1990-05-15",
      airForceAfSoc: "Army",
      EOD: "Green Beret",
      currentlyEmployed: false,
      location: "Location B",
    },
  ];

  // Columns definition for the DataGrid
  const columns = [
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "DOB", headerName: "DOB", width: 150 },
    { field: "airForceAfSoc", headerName: "Department", width: 200 },
    { field: "EOD", headerName: "Sub Domain", width: 200 },
    {
      field: "currentlyEmployed",
      headerName: "Employed",
      width: 150,
      renderCell: (params) => (
        <Typography className="text-xs font-semibold text-blue-gray-600 mt-7">
          {params.value ? "Yes" : "No"}
        </Typography>
      ),
    },
    { field: "location", headerName: "Location", width: 200 },

  ];

  // Convert dummy data to fit the DataGrid format
  const rows = dummyData.map((operator) => ({
    ...operator,
    id: operator._id,
    fullName: `${operator.firstName} ${operator.lastName}`,
    DOB: operator.DOB.slice(0, 10),
  }));

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setSelectedUser(null);
    setOpenViewModal(false);
  };

  return (
    <>
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
          Assigned to Operator
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowHeight={80}
            />
          </div>
        </CardBody>
      </Card>

      {/* View Modal */}
      <Dialog open={openViewModal} onClose={handleCloseViewModal}>
        <DialogTitle>View Operator</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            value={selectedUser?.firstName + " " + selectedUser?.lastName}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="DOB"
            value={selectedUser?.DOB}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Department"
            value={selectedUser?.airForceAfSoc}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Sub Domain"
            value={selectedUser?.EOD}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Location"
            value={selectedUser?.location}
            fullWidth
            margin="dense"
            readOnly
          />
          <Typography variant="body2" color="textSecondary">
            Employed: {selectedUser?.currentlyEmployed ? "Yes" : "No"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <DummyConcierge/>
    </>
  );
};

export default AssignedForms;
