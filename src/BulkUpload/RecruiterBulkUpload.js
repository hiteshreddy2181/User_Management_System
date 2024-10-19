import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@mui/material';
import { UploadFile as UploadFileIcon } from '@mui/icons-material';
import Papa from 'papaparse';
import axios from 'axios';

const RecruiterBulkUpload = ({ handleBulkOpen, handleBulkClose, bulkUploadOpen, setBulkUploadOpen }) => {
    const [rows, setRows] = useState([]);
    const [files, setFiles] = useState({});
    const [position, setPosition] = useState('');
    const [getAllPositions, setAllPositions] = useState([])

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const result = await axios.get("http://localhost:5000/get-allpositions");
                setAllPositions(result.data);
            } catch (error) {
                console.error("Error fetching positions:", error);
            }
        };
        fetchPositions();
    }, [bulkUploadOpen]);

    const handleChange = (event) => {
        setPosition(event.target.value);
    };

    const handleCsvUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (result) => {
                    const filteredRows = result.data.filter(row => Object.values(row).some(value => value));
                    setRows(filteredRows);
                },
            });
        }
    };

    const handleFileUpload = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            setFiles((prevFiles) => ({ ...prevFiles, [index]: file }));
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        if(!position) {
            return
        }
        rows.forEach((row, index) => {
            Object.keys(row).forEach(key => {
                formData.append(`data[${index}][${key}]`, row[key]);
            });
            if (files[index]) {
                formData.append(`data[${index}][resume]`, files[index]);
            }
            if (position) {
                formData.append(`data[${index}][positionId]`, position);
            }
        });

        try {
            const response = await axios.post('http://localhost:5000/application-bulk-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload Success:', response.data);
            setBulkUploadOpen(false)
        } catch (error) {
            console.error('Upload Error:', error);
        }
    };

    const handleClose = () => {
        setRows([]);
        setFiles({});
        handleBulkClose();
    };

    return (
        <Box>
            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={bulkUploadOpen}
                onClose={handleClose}
            >
                <Box p={2} justifyContent={"space-between"} textAlign={"center"} justifyItems={"center"} display={"flex"}>
                    <Typography component={"div"} variant='h6'>Bulk Upload</Typography>
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                            <InputLabel id="demo-select-small-label">Select Position</InputLabel>
                            <Select
                                value={position}
                                label="Select Position"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {getAllPositions.map((pos) => (
                                    <MenuItem key={pos.id} value={pos.id}>
                                        {pos.positionName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <DialogContent>
                    <Paper>
                        {!rows.length && (<Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed #ccc',
                                borderRadius: '8px',
                                padding: '20px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                marginBottom: '20px',
                                height: '150px'
                            }}
                            onClick={() => document.getElementById('csv-upload').click()}
                        >
                            <input
                                accept=".csv"
                                style={{ display: 'none' }}
                                id="csv-upload"
                                type="file"
                                onChange={handleCsvUpload}
                            />
                            <Typography variant="h6" color="textSecondary">
                                Click here or drag and drop to upload a CSV file
                            </Typography>
                        </Box>)}
                        {rows.length > 0 && (
                            <TableContainer component={Paper}>
                                <Table dense={true} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Index</TableCell>
                                            {rows.length > 0 &&
                                                Object.keys(rows[0]).map((key) => <TableCell key={key}>{key}</TableCell>)}
                                            <TableCell>Upload</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                {Object.values(row).map((value, idx) => (
                                                    <TableCell key={idx}>{value}</TableCell>
                                                ))}
                                                <TableCell>
                                                    <input
                                                        accept=".pdf"
                                                        style={{ display: 'none' }}
                                                        id={`upload-${index}`}
                                                        type="file"
                                                        onChange={(event) => handleFileUpload(index, event)}
                                                    />
                                                    <label htmlFor={`upload-${index}`}>
                                                        <IconButton color="primary" component="span">
                                                            <UploadFileIcon />
                                                        </IconButton>
                                                    </label>
                                                    {files[index] && files[index].name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RecruiterBulkUpload;
