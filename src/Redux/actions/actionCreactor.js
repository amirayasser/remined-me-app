import { ADD_REMINDER, EDIT_REMINDER, DELETE_REMINDER, TOGGLE_REMINDER_COMPLETED, DELETE_ALL } from './actionTypes/Types';

export const addReminder = (reminder)=>({
  type:ADD_REMINDER,
  payload: reminder,
});

export const deleteReminder = (index) => ({
  type:DELETE_REMINDER,
  payload: index
})
export const deleteAll = () => ({
  type:DELETE_ALL,
})

export const editReminder = (index, newText , newDate) => ({
  type: "EDIT_REMINDER",
  payload: { index, newText, newDate },
});

export const toggleReminderCompleted = (index) => ({
  type: TOGGLE_REMINDER_COMPLETED,
  payload: index,
});


