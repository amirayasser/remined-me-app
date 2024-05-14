import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import Sound from "react-sound";
import { useSelector, useDispatch } from "react-redux";
import {
  addReminder,
  editReminder,
  deleteReminder,
  toggleReminderCompleted,
  deleteAll,
} from "../Redux/actions/actionCreactor";

import { createPortal } from "react-dom";
import Form from "../components/Form";
import ReminderList from "../components/ReminderList";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import sound from "../assets/sounds/marimba-ringtone-2-185153.mp3";

const Reminders = () => {
  const reminderList = useSelector((state) => state.reminderList);
  const dispatch = useDispatch();

  const audio = new Audio();
  audio.src = sound;
  // Preload audio and check for autoplay permission
  useEffect(() => {
    const preloadAudio = async () => {
      try {
        await audio.load();
      } catch (error) {
        console.error("Error preloading audio:", error);
      }
    };

    preloadAudio();
  }, []);

  const now = new Date();

  function checkReminders(reminderList, currentTime) {
    return reminderList
      .map((reminder) => {
        if (
          reminder.reminderDate &&
          new Date(reminder.creationDate).getTime() >= currentTime
        ) {
          const reminderTime = new Date(reminder.reminderDate).getTime();
          const timeDiff = reminderTime - currentTime;
          if (timeDiff !== 0) {
            return reminder.text;
          } else {
            setTimeout(() => {
              notify(reminder.text);
            }, timeDiff);
            return undefined; // Mark reminder as handled
          }
        }
        return undefined; // Mark reminder as handled
      })
      .filter(Boolean); // Filter out undefined reminders
  }

  const clearAll = () => {
    dispatch(deleteAll());
    //  localStorage.removeItem("myRemindList");
  };

  useEffect(() => {
    reminderList.forEach((reminder) => {
      if (reminder.reminderDate) {
        const reminderTime = new Date(reminder.reminderDate).getTime();
        const currentTime = now.getTime();
        const timeDiff = reminderTime - currentTime;
        if (timeDiff < 0) {
          // notify(reminder.text);
          console.log(reminder.text);
        } else {
          setTimeout(() => {
            notify(reminder.text);
            console.log("coming ... ", reminder.text);
          }, timeDiff);
        }
      }
    });
  }, [reminderList]);

  const notify = (reminderText) => {
    try {
      audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }

    toast.info(`Reminder: ${reminderText}`, {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [showForm, setShowForm] = useState(false);

  const openCreateReminderField = () => {
    setShowForm(true);
  };

  const closeCreateReminderField = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (reminder, reminderDate) => {
    // Handle form submission logic here
    console.log("Reminder:", reminder);
    console.log("Reminder Date:", reminderDate);
    closeCreateReminderField(); // Close the form after submission
  };

  const [seeAll, setSeeAll] = useState(false);
  const handleSeeAll = () => {
    setSeeAll((prev) => !prev);
  };

  return (
    <div
      className="reminder"
      style={{
        // width: "100vw",
        marginInline: "auto",
        height: "100vh",
        overflow: "hidden",
        padding: window.innerWidth >= "460" ? "6vh 20vh" : "110px 20px",
        // backgroundColor: "#B6C9F0",
      }}
      id="portal-root"
    >
      <h1 style={{ marginBottom: "20px", color: "#E93B81" }}>Remind me</h1>
      <button
        onClick={openCreateReminderField}
        className="add"
        style={{
          right: window.innerWidth < 460 ? "10%" : "25%",
        }}
      >
        +
      </button>
      {showForm && (
        <>
          <div className="overlay" onClick={closeCreateReminderField}></div>
          <div className="modal">
            <Form
              onSubmit={handleFormSubmit} // Pass the submit handler function
              onClose={closeCreateReminderField} // Pass the close handler function
            />
          </div>
        </>
      )}

      {/* list */}

      <div
        style={{
          maxWidth: "380px",
          width: "90vw",
          minHeight: "100px",
          maxHeight: "306px",
          boxShadow: "0 0 10px 03px #E93B81",
          background: "#faf8f0",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          flexWrap: "wrap",
          // gap: "3%",
          overflow: seeAll ? "scroll" : "hidden",
          padding: "10px 0 14px",
          borderRadius: "10px",
        }}
      >
        <h4
          style={{
            // flexGrow: 2,
            marginLeft: "30px",
            //  width: "70%",
            borderBottom: "3px solid ",
            paddingBottom: "4px",
            marginBottom: "25px",
            // textShadow: "01px 01px 0.1px #000",
            color: "#E93B81",
          }}
        >
          upcoming
        </h4>
        <h6
          style={{
            flexGrow: 0,
            marginRight: "20px",
            width: "10%",
            // textShadow: "01px 01px 0.1px #000",
            cursor: "pointer",
            color: "#000",
          }}
          onClick={handleSeeAll}
        >
          see all
        </h6>

        <ReminderList
          addstyle={{
            flexGrow: 3,
            width: "80%",
            marginLeft: "20px",
          }}
          complete={"no"}
        />
      </div>

      <div
        style={{
          maxWidth: "380px",
          width: "90vw",
          minHeight: "100px",
          maxHeight: "220px",
          boxShadow: "0 0 10px 03px #E93B81",
          marginTop: "35px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          flexWrap: "wrap",
          overflow: seeAll ? "scroll" : "hidden",
          padding: "10px 0",
          background: "#faf8f0",
          borderRadius: "10px",
        }}
      >
        <h4
          style={{
            flexGrow: 0,
            marginLeft: "30px",
            borderBottom: "3px solid ",
            paddingBottom: "1px",
            marginBottom: "20px",
            // textShadow: "01px 01px 0.1px #000",
            color: "#E93B81",
          }}
        >
          Done
        </h4>
        <h6
          style={{
            flexGrow: 0,
            marginRight: "20px",
            // textShadow: "01px 01px 0.1px #000",
            color: "#000",
            cursor: "pointer",
          }}
          onClick={handleSeeAll}
        >
          see all
        </h6>
        <ReminderList
          addstyle={{
            flexGrow: 3,
            width: "80%",
            marginLeft: "20px",
          }}
          complete={"yes"}
        />
      </div>
      {/* <Sound
        url={require("../assets/sounds/digital-alarm-107256.mp3")}
        playStatus={playSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlaySound(false)}
      /> */}
    </div>
  );
};

export default Reminders;
