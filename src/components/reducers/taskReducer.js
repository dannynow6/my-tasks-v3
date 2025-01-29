export const initialTaskState = {
  task: "",
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return {
        ...initialTaskState,
      };
    case "LOAD_TASK":
      return { ...state, ...action.payload };
    case "INIT":
      return { task: action.taskText };
    case "RESET":
      return initialTaskState;
    default:
      return state;
  }
};
