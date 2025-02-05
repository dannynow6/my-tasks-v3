"use client";
import React, { useEffect, useRef } from "react";
import { useTasks } from "@/context/TaskContext";
import { MdOutlineCancel, MdOutlineDeleteForever } from "react-icons/md";

const DeleteTaskModal = ({ isDeleteTaskOpen, onDeleteTaskClose, taskId }) => {
  const { deleteTask } = useTasks();
  const deleteModalRef = useRef(null);

  const handleDeleteTask = async (e) => {
    e.preventDefault();
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error(`Error deleting task: ${error}`);
    }
    onDeleteTaskClose();
  };

  useEffect(() => {
    if (isDeleteTaskOpen) {
      deleteModalRef.current.showModal();
    } else {
      deleteModalRef.current.close();
    }
  }, [isDeleteTaskOpen]);

  return (
    <dialog
      ref={deleteModalRef}
      id="delete-task"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-semibold text-base py-5 sm:text-lg">
          Permanently delete task
        </h3>
        <div className="flex flex-row items-center justify-around">
          <button
            className="btn text-base btn-error"
            aria-label="Delete task"
            onClick={handleDeleteTask}
          >
            <MdOutlineDeleteForever className="text-lg" alt="Delete task" />{" "}
            Delete
          </button>
          <button
            type="button"
            aria-label="Cancel"
            onClick={onDeleteTaskClose}
            className="btn text-base btn-ghost"
          >
            <MdOutlineCancel className="text-lg" alt="Cancel" /> Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteTaskModal;
