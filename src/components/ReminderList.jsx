import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addReminder,
  editReminder,
  deleteReminder,
  toggleReminderCompleted,
  deleteAll,

} from "../Redux/actions/actionCreactor";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { GoInfo } from "react-icons/go";
import { json } from "react-router-dom";

const ReminderItem = ({ addstyle, complete }) => {
  const reminderList = useSelector((state) => state.reminderList);

  const dispatch = useDispatch();

  const [editedReminderDate, setEditedReminderDate] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const toggleCompleted = (index) => {
    dispatch(toggleReminderCompleted(index));
  };

  const handleEditInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditReminderDateChange = (e) => {
    setEditedReminderDate(e.target.value);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedText(reminderList[index].text);
    setEditedReminderDate(reminderList[index].reminderDate);
  };

  const handleSaveEdit = (index) => {
    dispatch(editReminder(index, editedText, editedReminderDate));
    setEditingIndex(null);
    setEditedText("");
    setEditedReminderDate("");
  };

  const [showInfo, setShowInfo] = useState(false);
  const handleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const handleClearReminder = (index) => {
    dispatch(deleteReminder(index));
  };

  const now = new Date();

  //  save to local storage
  useEffect(() => {
    localStorage.setItem("reminderlist", JSON.stringify(reminderList));
  }, [reminderList]);

   useEffect(() => {
     // Get from local storage
     const remindersFromLocalStorage = JSON.parse(
       localStorage.getItem("reminderList")
     );
     if (remindersFromLocalStorage) {
       dispatch(remindersFromLocalStorage);
     }
   }, []);

  return (
    <div style={{ ...addstyle }}>
      {reminderList && reminderList.length > 0 ? (
        reminderList.map((item, index) => (
          <React.Fragment key={index}>
            {complete === "yes" && item.completed ? (
              <div
                key={index}
                style={{
                  backgroundColor: "#75A47F",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "330px",
                  maxWidth: "95%",
                  marginBottom: "20px",
                  padding: "6px 10px",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="reminderitem"
                  style={{
                    textDecoration: "line-through",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "8px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    id="myCheckbox"
                    name="myCheckbox"
                    style={{}}
                    defaultChecked={item.completed}
                    onChange={() => toggleCompleted(index)}
                  />

                  <h3 style={{ flexGrow: 3, color: "#000" }}>{item.text}</h3>

                  <button
                    onClick={() => handleClearReminder(index)}
                    style={{
                      border: "none",
                      background: "none",
                      // marginRight: 0,
                      marginLeft: "auto",
                    }}
                  >
                    <MdOutlineDelete />
                  </button>

                  {item.reminderDate !== null && (
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#000",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <MdNotificationsActive style={{ margin: "0 10px" }} />

                      <p style={{ fontSize: "0.8rem" }}>
                        {new Date(item.reminderDate).toLocaleString()}
                      </p>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              complete === "no" &&
              !item.completed && (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#BACD92",
                    width: "330px",
                    maxWidth: "95%",
                    marginBottom: "20px",
                    padding: "6px 10px",
                    borderRadius: "10px",
                  }}
                >
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editedText}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="datetime-local"
                        value={editedReminderDate}
                        onChange={handleEditReminderDateChange}
                      />
                      <button
                        onClick={() => handleSaveEdit(index)}
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#FFD4D4",
                          marginLeft:'10px',
                          padding:'4px 6px',
                          borderRadius:'10px',
                          
                        }}
                      >
                        save
                      </button>
                    </>
                  ) : (
                    <div
                      className="reminderitem"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        id="myCheckbox"
                        name="myCheckbox"
                        style={{}}
                        checked={item.completed}
                        onChange={() => toggleCompleted(index)}
                      />
                      <h3 style={{ color: "#000", flexGrow: "3" }}>
                        {item.text}
                      </h3>

                      <button
                        onClick={() => handleInfo()}
                        style={{ border: "none", background: "none" }}
                      >
                        <GoInfo />
                      </button>
                      <button
                        onClick={() => handleEdit(index)}
                        style={{ border: "none", background: "none" }}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleClearReminder(index)}
                        style={{ border: "none", background: "none" }}
                      >
                        <MdOutlineDelete />
                      </button>
                      {showInfo && (
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "0.8rem",
                            width: "100%",
                          }}
                        >
                          created {item.creatationDate}
                        </span>
                      )}
                      {item.reminderDate !== null && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#000",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <MdNotificationsActive style={{ margin: "0 10px" }} />

                          <p style={{ fontSize: "0.8rem" }}>
                            {new Date(item.reminderDate).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            )}
          </React.Fragment>
        ))
      ) : (
        <p>No reminders to display.</p>
      )}
    </div>
  );
};

export default ReminderItem;
