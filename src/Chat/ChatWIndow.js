import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, IconButton, Typography, Avatar } from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import { io } from 'socket.io-client';
import AppContext from '../Context/AppContext';
import { useParams } from 'react-router-dom';

// Initialize the socket connection
const socket = io('http://localhost:5000'); // Update this URL for your production server

const Chat = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const fields = useContext(AppContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [sentMessages, setSentMessages] = useState([]); // Track sent messages

  // Mock current user, ensure `fields.fields.userid` is available
  const currentUser = fields.fields.userid || 'defaultUser';

  useEffect(() => {
    console.log(roomId);
    if (roomId) {
      // Join the room
      socket.emit('joinRoom', roomId);

      // Fetch chat information if needed (replace with your fetch logic)
      // fetchChatInfo(id).then(chat => setCurrentChat(chat));

      // Listen for incoming messages
      socket.on('message', (msg) => {
        // Check if the incoming message was sent by the current user
        if (!sentMessages.some(sentMsg => sentMsg.text === msg.text && sentMsg.roomId === msg.roomId)) {
          setMessages((prevMessages) => [...prevMessages, msg]);
        } else {
          // Remove the message from sentMessages if it was received from the server
          setSentMessages((prevSentMessages) => prevSentMessages.filter(sentMsg => sentMsg.text !== msg.text));
        }
      });

      // Cleanup the socket connection on component unmount
      return () => {
        socket.off('message');
        socket.emit('leaveRoom', roomId);
      };
    }
  }, [roomId, sentMessages]);

  const handleSend = () => {
    if (message.trim() && roomId) {
      const msg = {
        user: currentUser,
        text: message,
        roomId,
      };

      // Emit the message event
      socket.emit('message', msg);

      // Add the message to the local state
      setMessages((prevMessages) => [...prevMessages, msg]);
      setSentMessages((prevSentMessages) => [...prevSentMessages, msg]); // Track sent message

      // Clear the input field
      setMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#131c21' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: '#0b141a' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #333' }}>
          <Avatar sx={{ mr: 2 }}>U</Avatar>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            {currentChat?.name || 'Loading...'}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column' }}>
          {messages
            .filter((msg) => msg.roomId === roomId)
            .map((msg, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1,
                  p: 1.5,
                  borderRadius: 2,
                  color: '#fff',
                  maxWidth: '80%',
                  alignSelf: msg.user === currentUser ? 'flex-end' : 'flex-start',
                  bgcolor: msg.user === currentUser ? '#054740' : '#262d31',
                  wordBreak: 'break-word', // Ensure long words wrap properly
                }}
              >
                {msg.text}
              </Box>
            ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: '1px solid #333' }}>
          <IconButton>
            <AttachFile sx={{ color: '#fff' }} />
          </IconButton>
          <TextField
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ input: { color: '#fff' } }}
          />
          <IconButton onClick={handleSend}>
            <Send sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
