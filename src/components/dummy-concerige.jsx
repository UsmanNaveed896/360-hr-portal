import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Puff } from "react-loader-spinner";
import { useGetConciergeHook } from "@/hooks/useGetConciergeHook";

const DummyConcierge = () => {
  const concierge = useGetConciergeHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // No need to call API for data as we're using dummy data
  }, []);

  const dummyData = [
    {
      _id: '1',
      fullName: 'John Doe',
      DOB: '1985-05-15',
      branchOfService: 'Army',
      contactMethod: 'Email',
      howHeardAboutUs: 'Friend',
      whyConcierge: 'Career Transition',
      hoursPerMonth: '40',
      numberOfOperators: '3',
      transitionServices: 'Resume Writing',
      recommendedTransitionServices: 'Interview Coaching',
      uncomfortableTopics: 'Salary Negotiation'
    },
    {
      _id: '2',
      fullName: 'Jane Smith',
      DOB: '1990-08-22',
      branchOfService: 'Navy',
      contactMethod: 'Phone',
      howHeardAboutUs: 'Social Media',
      whyConcierge: 'Career Growth',
      hoursPerMonth: '30',
      numberOfOperators: '2',
      transitionServices: 'Career Counseling',
      recommendedTransitionServices: 'Networking Tips',
      uncomfortableTopics: 'Job Security'
    }
  ];

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  };

  const handleCloseViewModal = () => {
    setSelectedUser(null);
    setOpenViewModal(false);
  };

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150,
      renderCell: (params) => (
        <div>
          <Tooltip title={params.value} arrow>
            <Typography className="mt-3 text-sm" noWrap>{params.value}</Typography>
          </Tooltip>
          <Tooltip title={params.row.DOB} arrow>
            <Typography className="mt-3 text-sm" noWrap><span className="font-bold">Dob:</span> {params.row.DOB.slice(0, 10)}</Typography>
          </Tooltip>
        </div>
      ),
    },
    {
      field: 'branchOfService',
      headerName: 'Branch of Service',
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography className="mt-6" noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: 'contactMethod',
      headerName: 'Contact Method',
      width: 150,
    },
    {
      field: 'howHeardAboutUs',
      headerName: 'Source',
      width: 150,
    },
    {
      field: 'whyConcierge',
      headerName: 'Reason',
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography className="mt-6" noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: 'hoursPerMonth',
      headerName: 'No of Hr/Operators',
      width: 150,
      renderCell: (params) => (
        <Typography className="text-center mt-6">{params.value} / {params.row.numberOfOperators}</Typography>
      ),
    },
    {
      field: 'transitionServices',
      headerName: 'Organization',
      width: 150,
    },
    {
      field: 'recommendedTransitionServices',
      headerName: 'Support Areas',
      width: 150,
    },
    {
      field: 'uncomfortableTopics',
      headerName: 'Topics',
      width: 150,
    },
  
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
          Assigned to Concierge
          </Typography>
        </CardHeader>
        {concierge?.loading ? (
          <div className="flex justify-center">
            <Puff
              visible={true}
              height="80"
              width="80"
              color="#607d8b"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <CardBody className="px-0 pt-0 pb-2">
            <div style={{ height: 300, width: '100%' }}>
              <DataGrid
                rows={dummyData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                rowHeight={80}
              />
            </div>
          </CardBody>
        )}
      </Card>

      <Dialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit {selectedUser?.fullName}</DialogTitle>
        <DialogContent dividers>
          <div className="mb-4">
            <Input
              type="text"
              label="Full Name"
              value={selectedUser?.fullName || ''}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, fullName: e.target.value })
              }
              fullWidth
            />
          </div>
          {/* Other fields */}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="gray" onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={() => {}}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openViewModal}
        onClose={handleCloseViewModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedUser?.fullName}</DialogTitle>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <DialogContent dividers style={{ flex: 1, overflowY: 'auto' }}>
            <Typography variant="body1">
              <b>DOB:</b> {selectedUser?.DOB?.slice(0, 10)}
            </Typography>
            {/* Other fields */}
          </DialogContent>
          <DialogActions style={{ justifyContent: 'flex-end', padding: '16px' }}>
            <Button color="gray" onClick={handleCloseViewModal}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>

    </div>
  );
};

export default DummyConcierge;
