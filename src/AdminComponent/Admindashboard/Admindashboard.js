import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { blue } from '@mui/material/colors';
import { FormControl, InputLabel, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AdminDashboard() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    FIRSTNAME: '',
    LASTNAME: '',
    USERNAME: '',
    PASSWORD: '',
    ROLE: '',
    STARTDATE: '',
    DATEOFADMISSION: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-users'); // Replace with your backend endpoint
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    // Fetch the data from the backend
    fetchData();
  }, []);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setFormData({
      ...row,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async () => {
    try{
      await axios.put(`http://localhost:5000/update-user/${selectedRow.USERNAME}`, {
        ...formData,
      });
      const updatedRows = rows.map((row) => (row.USERNAME === selectedRow.USERNAME ? formData : row));
      setRows(updatedRows);
      handleClose();
      toast.success('Updated successfully !!!');
    } catch (error) {
      console.error("Error updating user", error);
      toast.error('Updation failed. Please try again.');
    }
  };

  const handleDelete = async (USERNAME) => {
    try {
      await axios.delete(`http://localhost:5000/delete-user/${USERNAME}`); // Replace with your backend endpoint
      setRows(rows.filter((row) => row.USERNAME !== USERNAME));
      toast.success('Deleted successfully !!!');
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error('Deletion failed. Please try again.');
    }
  };

  const [addOpen, setAddOpen] = useState(false); // New state for Add User modal
 const handleAddClose = () => {
    setAddOpen(false);
  };
  const handleAddOpen = () => {
    setFormData({
      FIRSTNAME: '',
      LASTNAME: '',
      USERNAME: '',
      PASSWORD: '',
      ROLE: '',
      STARTDATE: '',
      DATEOFADMISSION: '', // Set as empty for new user
    });
    setAddOpen(true);
  };
  const handleAddSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/add-user`, formData); // Replace with your backend endpoint
      handleAddClose();
      fetchData();
      toast.success('User Added successfully !!!');
    } catch (error) {
      console.error("Error adding student", error);
      toast.error('User addition failed. Please check the Details and try again.');
    }
  };

  const columns = [
    { field: 'FIRSTNAME', headerName: 'First Name', width: 190 },
    { field: 'LASTNAME', headerName: 'Last Name', width: 190 },
    { field: 'USERNAME', headerName: 'USERNAME', width: 190 },
    { field: 'ROLE', headerName: 'ROLE', width: 190 },
    { field: 'STARTDATE', headerName: 'Start Date', width: 220 },
    { field: 'DATEOFADMISSION', headerName: 'Date of Admission', width: 220 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button sx={{color:'white',backgroundColor:'lightskyblue', marginRight:'25px'}} onClick={() => handleOpen(params.row)}>
            Edit
          </Button>
          <Button sx={{color:'white' ,backgroundColor:'orange'}} onClick={() => handleDelete(params.row.USERNAME)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    <div style={{display:"flex", justifyContent:"space-between" , marginBottom:"10px"}}>
    <Typography variant='h4'>User Details</Typography>
    <Button variant="contained" color="primary" sx={{alignItems:"end"}} onClick={handleAddOpen}>
        Add User
      </Button>
    </div>
      <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        pageSizeOptions={[5, 10]} 
        checkboxSelection 
        sx={{ border: 0 }}
        getRowId={(row) => row.USERNAME} // Use USERNAME as the unique row id
        />
      </Paper>
      
      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2 style={{color:"#fff"}}>Edit Student</h2>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="FIRSTNAME"
            value={formData.FIRSTNAME}
            onChange={handleEdit}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="LASTNAME"
            value={formData.LASTNAME}
            onChange={handleEdit}
          />
          <TextField
            fullWidth
            margin="normal"
            label="USERNAME"
            name="USERNAME"
            value={formData.USERNAME}
            onChange={handleEdit}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="ROLE"
              value={formData.ROLE}
              label="Role"
              onChange={handleEdit}
            >
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="student">student</MenuItem>
              <MenuItem value="studentadmin">studentadmin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Start Date (YYYY-MM-DD)"
            name="STARTDATE"
            value={formData.STARTDATE}
            onChange={handleEdit}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date of Admission (YYYY-MM-DD)"
            name="DATEOFADMISSION"
            value={formData.DATEOFADMISSION}
            onChange={handleEdit}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Modal open={addOpen} onClose={handleAddClose}>
        <Box sx={style}>
          <h2 style={{color:"#fff"}}>Add New User</h2>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="FIRSTNAME"
            value={formData.FIRSTNAME}
            onChange={handleEdit}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="LASTNAME"
            value={formData.LASTNAME}
            onChange={handleEdit}
          />
          <TextField
            fullWidth
            margin="normal"
            label="USERNAME"
            name="USERNAME"
            value={formData.USERNAME}
            onChange={handleEdit}
          />
          <TextField
            fullWidth
            margin="normal"
            label="PASSWORD"
            name="PASSWORD"
            value={formData.PASSWORD}
            onChange={handleEdit}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="ROLE"
              value={formData.ROLE}
              label="Role"
              onChange={handleEdit}
            >
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="student">student</MenuItem>
              <MenuItem value="studentadmin">studentadmin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Start Date (YYYY-MM-DD)"
            name="STARTDATE"
            value={formData.STARTDATE}
            onChange={handleEdit}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date of Admission (YYYY-MM-DD)"
            name="DATEOFADMISSION"
            value={formData.DATEOFADMISSION}
            onChange={handleEdit}
          />
          <Button variant="contained" color="primary" onClick={handleAddSubmit}>
            Add User
          </Button>
        </Box>
      </Modal>
    </>
  );
}
