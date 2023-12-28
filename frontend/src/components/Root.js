import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import "../App.css";

function UserCard({ user }) {
  return (
    <Link to="/calender">
      <div className="card">
        <h3 className="card-title">{user.name}</h3>
      </div>
    </Link>
  );
}

const Root = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/get-allusers");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setUserList(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newUserName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newUser = await response.json();
      setUserList([...userList, newUser]);
      setNewUserName("");
      handleModalClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400 },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <IconButton onClick={handleMenuClick}>
        <SettingsIcon />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={handleModalOpen}>Add User</MenuItem>
      </Menu>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User
          </Typography>
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <Button onClick={handleAddUser} color="primary" variant="contained">
            Submit
          </Button>
        </Box>
      </Modal>

      <div
        className="card-container"
        style={{
          marginTop: 100,
          marginBottom: 100,
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        {userList.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Root;
