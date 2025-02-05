"use client";
import React, { useState, useReducer } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFirestore } from "@/context/FirestoreContext";
import { useTasks } from "@/context/TaskContext";
import { initialTaskState, taskReducer } from "../reducers/taskReducer";
import { MdEdit, MdDelete, MdDone } from "react-icons/md";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskButton from "../ui/TaskButton";
import EditTaskModal from "./EditTaskModal";

const TaskList = () => {
  const { user, isLoading } = useAuth();
  const { updateDocStatus } = useFirestore();
  const { tasks, getTaskById } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const editTask = async (task) => {
    try {
      task && setIsModalOpen(true);
    } catch (error) {
      console.error(`Error opening modal to edit task: ${error}`);
    }
  };

  const openEditModal = async (id) => {
    try {
      const task = await getTaskById(id);
      setCurrentTask(task);
      editTask(task);
    } catch (error) {
      console.error(`Error fetching document: ${error}`);
    }
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const confirmDeleteTask = async (task) => {
    try {
      task && setIsDeleteOpen(true);
    } catch (error) {
      console.error(`Error opening delete task modal: ${error}`);
    }
  };

  const openDeleteModal = async (id) => {
    try {
      const task = await getTaskById(id);
      setCurrentTask(task);
      confirmDeleteTask(task);
    } catch (error) {
      console.error(`Error fetching document: ${error}`);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const resetState = () => {
    dispatch({ type: "RESET" });
  };

  if (!user && !isLoading) {
    return (
      <p className="mt-8 text-base sm:text-lg">
        Sign in to create and manage your tasks
      </p>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="mt-8 text-base sm:text-lg">
        Click 'Add Task' to create a new task
      </p>
    );
  }

  return (
    <section className="flex flex-col w-full items-center justify-center">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className={`flex flex-row items-center justify-between w-full text-xs sm:text-sm md:text-base px-4 sm:px-8 py-4 ${
            index % 2 === 0 ? "bg-base-100" : "bg-base-200"
          }`}
        >
          <span className="font-semibold space-x-4">
            <span
              style={{
                textDecoration: task.isComplete ? "line-through" : "none",
              }}
            >
              {task.task}
            </span>
          </span>
          <span className="space-x-2 sm:space-x-4">
            <TaskButton
              toolText={"mark complete"}
              btnColor={"btn-warning"}
              onClick={() => updateDocStatus(task.id, task.isComplete)}
              btnIcon={<MdDone className="text-base sm:text-lg" />}
            />
            <TaskButton
              toolText={"edit task"}
              btnColor={"btn-info"}
              onClick={() => openEditModal(task.id)}
              btnIcon={<MdEdit className="text-base sm:text-lg" />}
            />
            <TaskButton
              toolText={"delete task"}
              btnColor={"btn-error"}
              onClick={() => openDeleteModal(task.id)}
              btnIcon={<MdDelete className="text-base sm:text-lg" />}
            />
          </span>
        </div>
      ))}
      <EditTaskModal
        isTaskModalOpen={isModalOpen}
        onCloseTaskModal={closeEditModal}
        taskText={currentTask && currentTask.task}
        resetState={resetState}
        taskId={currentTask && currentTask.id}
      />
      <DeleteTaskModal
        isDeleteTaskOpen={isDeleteOpen}
        onDeleteTaskClose={closeDeleteModal}
        taskId={currentTask && currentTask.id}
      />
    </section>
  );
};

export default TaskList;
