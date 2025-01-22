import { MdAddTask } from "react-icons/md";

const AddTask = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="btn btn-primary text-lg btn-wide hover:btn-secondary hover:scale-105 transition ease-in-out"
        onClick={() => document.getElementById("add_new_task").showModal()}
      >
        <MdAddTask /> Add Task
      </button>
    </div>
  );
};

export default AddTask;
