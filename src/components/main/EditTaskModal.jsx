"use client";
import React, { useReducer, useEffect, useRef } from "react";
import { MdEdit, MdOutlineCancel } from "react-icons/md";
import { useFirestore } from "@/context/FirestoreContext";
import { initialTaskState, taskReducer } from "../reducers/taskReducer";

const EditTaskModal = ({
  isTaskModalOpen,
  onCloseTaskModal,
  taskText,
  resetState,
  taskId,
}) => {
  const modalRef = useRef(null);
  const { updateDocument } = useFirestore();
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {
    if (taskText) {
      dispatch({ type: "INIT", taskText });
    }
  }, [taskText]);

  useEffect(() => {
    if (isTaskModalOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
      resetState();
    }
  }, [isTaskModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDocument(
        "myTasks",
        {
          task: state.task,
        },
        taskId
      );
    } catch (error) {
      console.error(`Error updating task: ${error}`);
    }
    onCloseTaskModal();
  };

  return (
    <dialog
      ref={modalRef}
      id="edit_task"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-3"
        >
          <input
            type="text"
            value={state.task || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "task",
                value: e.target.value,
              })
            }
            placeholder={taskText}
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <button
            type="submit"
            className="btn btn-wide btn-success"
            aria-label="Update task"
          >
            <MdEdit className="text-lg" alt="Update task" /> Save
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button
              type="button"
              onClick={onCloseTaskModal}
              className="btn btn-ghost"
              aria-label="Cancel"
            >
              <MdOutlineCancel className="text-lg" alt="Cancel" /> Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditTaskModal;
