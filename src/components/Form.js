import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { addReminder } from "../Redux/actions/actionCreactor";

const now = new Date();

export default function Form({ onClose }) {

    const [reminder, setReminder] = useState();
    const [reminderDate, setReminderDate] = useState(null);

    const dispatch = useDispatch();

    const reminderObject = {
        text: reminder,
        creatationDate: now.toLocaleString(),
        reminderDate: reminderDate ? new Date(reminderDate) : null,
        completed: false,
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(reminder === ''){
            return;
        }else{
            dispatch(addReminder(reminderObject));
        
        }


        onClose();
    };

  return createPortal(
      <form onSubmit={handleSubmit}
      className="form"
      >
          <input
              id=""
              fullWidth
              variant="standard"
              label="what do you want to remind about?"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              style={{
                  padding: "6px 12px",
                  borderRadius: '5px',
              }}
          />
          <br />

          <input
              type="datetime-local"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              style={{
                  padding: "6px",
                  borderRadius: '5px',
              }}
          />
          <br />
          <button type="submit"
          style={{
            padding:"6px 12px",
            borderRadius:'5px',
            border:'none',
            boxShadow:'0 0 5px 2px #fff',
              background:'#BACD92',
              color:'#E93B81',
              fontWeight:'700',
              textShadow:'01px 01px 1px #fff'
          }}
          >Add Reminder</button>
      </form> ,
      document.getElementById("portal-root") // Make sure you have a div with id "portal-root" in your HTML file
  )
}
