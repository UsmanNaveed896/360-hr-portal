import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { DataGrid } from "@mui/x-data-grid";
import { Puff } from "react-loader-spinner";
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  TextField,
  DialogActions,
} from "@mui/material";
import { MdVisibility } from "react-icons/md";
import { useGetConciergeHook } from "@/hooks/useGetConciergeHook";
import { useGetPeerAmbassadorHook } from "@/hooks/useGetPeerAmbassadorHook";
import { useServicePartnerHook } from "@/hooks/useServicePartners";
import { IoIosCloseCircle } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
const Operator = () => {
  const getOperatorksHook = useGetOperatorHook();
  const concierge = useGetConciergeHook();
  const peers = useGetPeerAmbassadorHook();
  const partners = useServicePartnerHook();

  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [rowData, setRowData] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
 const [id,setId]=useState()

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => {
    setSelectedUser(null);
    setOpenViewModal(false);
  };
  const handleOpenEditModal = (row) => {
    setOpenEditModal(true);
    setSelectedRow(row);
  };

  const handleUpdateStatus = () => {
    let payLoad = {
      id: selectedRow.id,
      status: "approved",
    };
    getOperatorksHook.handleUpdateStatus(payLoad, handleCloseEditModal);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenAssignModal = (role) => {
    setSelectedRole(role);

    if (role === "concierge") {
      concierge.handleGetConcierge();
    } else if (role === "peerAmbassador") {
      peers.handleGetPeerAmbassador();
    } else if (role === "servicePartner") {
      partners.handleGetServicePartner();
    }

    setOpenAssignModal(true);
  };
console.log(rowData,"dddd")
  const handleCloseAssignModal = () => {
    setSelectedRole("");
    setOpenAssignModal(false);
  };

  const handleAssignToChange = (row, value) => {
    setRowData(row);
    handleOpenAssignModal(value);
  };

  console.log(selectedRole,"ss")
  const handleAssign = (value) => {
    setId(value)
    if (selectedRole == "concierge") {
      let payLoad = {
        ...rowData,
        concierge_form_id:id.id,
        signed_from: "operators",
        signed_to: "concierge",
        form_id: rowData.id,
        user_id: parseInt(rowData.user_id),
      };
      getOperatorksHook.handleAssignOperatortoConcierge(
        payLoad,
        handleCloseAssignModal
      );
    } else if (selectedRole == "peerAmbassador") {
      let payLoad = {
        ...rowData,
        peer_ambassador_form_id:id.id,
        signed_from: "operators",
        signed_to: "peer_ambassador",
        form_id: rowData.id,
        user_id:  parseInt(rowData.user_id),
      };
      getOperatorksHook.handleAssignOperatortoConcierge(
        payLoad,
        handleCloseAssignModal
      );
    } else {
      let payLoad = {
        ...rowData,
        service_partner_form_id:id.id,
        signed_from: "operators",
        signed_to: "service_partners",
        form_id: rowData.id,
        user_id:  parseInt(rowData.user_id),
      };

      getOperatorksHook.handleAssignOperatortoConcierge(
        payLoad,
        handleCloseAssignModal
      );
    }
  };
  console.log(id,"idssssss")
  useEffect(() => {
    getOperatorksHook.handleGetOperator();
  }, [getOperatorksHook.loginResponse]);
  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "birth_date",
      headerName: "DOB",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "force",
      headerName: "Department",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "speciality",
      headerName: "Sub Domain",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "currently_employed",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Employed",
      width: 150,
      renderCell: (params) => (
        <Typography className="text-xs font-semibold text-blue-gray-600 mt-7">
          {params.value ? "Yes" : "No"}
        </Typography>
      ),
    },
    {
      field: "address",
      headerName: "Location",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "created_at",
      headerName: "Status",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
      renderCell: (params) => (
        <div>
          <div className="flex gap-2 items-center mt-5">
            <Chip
              color={params?.value == "pending" ? "error" : "success"}
              className="text-white"
              label={params.value}
            />
            {params.value == "pending" ? (
              <CiEdit
                className="cursor-pointer w-7 h-7"
                onClick={() => handleOpenEditModal(params.row)}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ),
    },
    {
      field: "assignTo",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Assign to",
      width: 200,
      renderCell: (params) => (
        <div className="mt-3 text-white flex gap-3 items-center">
 
          <FormControl sx={{ width: "150px" }}>
            <InputLabel id="demo-simple-select-label" sx={{ color: params.row.created_at == "pending" ? "gray" : "white" }}>
            {params.row.created_at == "pending" ? "Pending" : "Assign To"}
            </InputLabel>
            <Select
              disabled={params.row.created_at == "pending"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              label={params.row.created_at == "pending" ? "Pending" : "Assign To"}
              onChange={(event) =>
                handleAssignToChange(params.row, event.target.value)
              }
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root": {
                      color: "black",
                    },
                  },
                },
              }}
            >
              <MenuItem value={"concierge"}>Concierge</MenuItem>
              <MenuItem value={"peerAmbassador"}>Peer Ambassador</MenuItem>
              <MenuItem value={"servicePartner"}>Service Partner</MenuItem>
            </Select>
          </FormControl>
        </div>
      ),
    },
    {
      field: "actions",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Typography
        className="cursor-pointer hover:font-extrabold"
        variant="h6"
        onClick={() => handleOpenViewModal(params.row)}
      >
        View
      </Typography>
      ),
    },
  ];

  const rows = getOperatorksHook.getOperators?.map((operator, index) => ({
    ...operator,
    id: operator?.id,
    fullName: `${operator.first_name} ${operator.last_name}`,
    DOB: operator?.birth_date,
  }));

  
  const renderModalContent = () => {
    let dataToRender;

    if (selectedRole === "concierge") {
      dataToRender = concierge.getConcierge || [];
    } else if (selectedRole === "peerAmbassador") {
      dataToRender = peers.getPeerAmbassador || [];
    } else if (selectedRole === "servicePartner") {
      dataToRender = partners.getServicePartner || [];
    } else {
      dataToRender = [];
    }

    const approvedData = dataToRender.filter(
      (user) => user.status === "approved"
    );

    if (approvedData.length === 0) {
      return (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          style={{ marginTop: 20 }}
        >
          No approved forms found.
        </Typography>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvedData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.full_name || user.name || user.organization_name}
                </TableCell>
                <TableCell>{user.phone_number || "N/A"}</TableCell>
                <TableCell>
                  {user.email || user.point_of_contact_email || "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ backgroundColor: "#191a45" }}
                    variant="contained"
                    size="small"
                    onClick={() => handleAssign(user)}
                  >
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card sx={{ backgroundColor: "#191a45" }}>
        <CardHeader
          variant="gradient"
          color="#000032"
          className="mb-8 p-6 bg-[#191a45]"
          sx={{ backgroundColor: "#191a45" }}
        >
          <Typography variant="h6" color="white">
            Operators
          </Typography>
        </CardHeader>
        {getOperatorksHook?.loading ? (
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
          <CardBody className="px-0 pt-0 pb-2 p-0">
            <div
              style={{
                height: 500,
                width: "100%",
                backgroundColor: "#191a45",
                color: "white",
              }}
            >
              <DataGrid
                rows={rows?.reverse()}
                columns={columns}
                pageSize={5}
                rowHeight={80}
                sx={{
                  "& .MuiDataGrid-root": {
                    backgroundColor: "#191a45",
                    color: "white",
                  },
                  "& .MuiDataGrid-cell": {
                    backgroundColor: "#191a45",
                    color: "white",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    color: "#fff", // Change footer background color to white
                  },
                  "& .MuiTablePagination-root": {
                    color: "#fff", // Change text color in footer if needed
                  },

                  "& .MuiDataGrid-columnHeaders": {
                    color: "#000",
                    backgroundColor: "#000032",
                  },
                  "& .MuiDataGrid-columnHeaderRow": {
                    background: "#000032 !important", // Remove any background
                  },
                }}
              />
            </div>
          </CardBody>
        )}
      </Card>

      <Dialog
        open={openAssignModal}
        onClose={handleCloseAssignModal}
        maxWidth="lg"
        fullWidth
      >
        <div className="flex justify-between items-center px-5">
          <DialogTitle>Assign Form</DialogTitle>
          <IoIosCloseCircle
            className="w-5 h-5 cursor-pointer"
            onClick={handleCloseAssignModal}
          />
        </div>

        <DialogContent>{renderModalContent()}</DialogContent>
      </Dialog>
      {/* Update STAtus ModAL */}
      {openEditModal && (
        <Dialog
          open={openEditModal}
          onClose={handleCloseEditModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Approve Operator</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to approve this operator?
            </Typography>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="contained"
                color="success"
                onClick={handleUpdateStatus}
              >
                Approve
              </Button>
              <Button variant="outlined" onClick={handleCloseEditModal}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {/* View Modal */}
      <Dialog open={openViewModal} onClose={handleCloseViewModal}>
        <DialogTitle>View Operator</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            value={selectedUser?.fullName}
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
            value={selectedUser?.force}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Sub Domain"
            value={selectedUser?.speciality}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Location"
            value={selectedUser?.address}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Assign to"
            value={selectedUser?.assignTo}
            fullWidth
            margin="dense"
            readOnly
          />
          <Typography variant="body2" color="textSecondary" style={{marginTop:'4px'}}>
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
  );
};

export default Operator;
