import React, { useState } from 'react'
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box } from '@mui/material';

export default async function NotifyUser(notificatonsText = "thanks for enabling notificatons") {
 if ("Notification" in window) {
   // Check if the browser supports notifications
   if (Notification.permission === "granted") {
     // If permission is already granted, display the notification
     new Notification("Notification Title", { body: "Notification Body" });
   } else if (Notification.permission !== "denied") {
     // If permission hasn't been denied, request permission from the user
     Notification.requestPermission().then((permission) => {
       if (permission === "granted") {
         // If permission is granted, display the notification
         new Notification("Notification Title", { body: "Notification Body" });
       }
     });
   } else {
     // If permission is denied, handle it gracefully (e.g., display a message)
     console.log("Notifications are disabled");
   }
 } else {
   // If the browser doesn't support notifications, handle it gracefully (e.g., display a message)
   console.log("Your browser does not support notifications");
 }


  const [userResponded, setUserResponded] = useState(false)

  // 1- we show the 'would yyou like to enable notifications?'
  // 2- show notifs related functionality
  // 3- show nothing (the user has disabled notifs)

async function enableNotifsAndClose()
{
  await NotifyUser().then(()=>{
    setUserResponded(true);
  })
}

function disableNotifsAndClose(){
  setUserResponded(true);
}

// alert open state 
const [open, setOpen] = React.useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  setOpen(false);
};

  return !userResponded && !(Notification.permission === "granted") ? (
    <Box>
      <Button onClick={handleClick}>enable Notifications</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Would you like to enable Notifications?
        </Alert>
        <Button colorScheme="blue" size="sm" onClick={enableNotifsAndClose}>
          Sure
        </Button>
        <Button colorScheme="red" size="sm" onClick={disableNotifsAndClose}>
          No, thanks
        </Button>
      </Snackbar>
    </Box>
  ) : (Notification.permission === "granted") ? (
    <Box>
      <Snackbar>
        <Alert>
          {notificatonsText}
        </Alert>
      </Snackbar>
    </Box>
  ) : (
    <Box>you have disabled notifications</Box>
  );
  
  
}

