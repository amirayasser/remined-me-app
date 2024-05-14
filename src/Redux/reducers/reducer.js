import { ADD_REMINDER, EDIT_REMINDER, DELETE_REMINDER, TOGGLE_REMINDER_COMPLETED , DELETE_ALL } from '../actions/actionTypes/Types';


const initialState = {
    reminderList: [],
};

export default function reducer(state = initialState, action) {

    switch(action.type){
        case ADD_REMINDER:
            return {
                ...state,
                reminderList:[...state.reminderList, action.payload]
            }

        case EDIT_REMINDER:
            const { index, newText, newDate } = action.payload;
            return {
                ...state,
                reminderList: state.reminderList.map((reminder, i) =>
                    i === index ? { ...reminder, text: newText, reminderDate: newDate } : reminder
                )
            }

        case TOGGLE_REMINDER_COMPLETED:
            return {
                ...state,
                reminderList: state.reminderList.map((item,index)=>
                index === action.payload ? {...item, completed: !item.completed} : item
                )
            }
        
        case DELETE_REMINDER:
            return {
               ...state,
               reminderList: state.reminderList.filter((item, index) => index !== action.payload)
            }

        case DELETE_ALL:
            console.log(state)
            return {
                ...state,
                reminderList: [], 
                
            };


        default:
            return state;
    }
}
