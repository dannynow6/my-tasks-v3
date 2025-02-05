"use client";
import { useAuth } from "@/context/AuthContext";
import SignInGoogle from "../ui/SignInGoogle";
import AddTask from "./AddTask";
import AddTaskModal from "./AddTaskModal";
import TaskList from "./TaskList";

const MyTasks = () => {
  const { user } = useAuth();

  return (
    <section className="flex flex-col w-full items-center justify-center gap-4">
      {user ? <AddTask /> : <SignInGoogle />}
      <AddTaskModal />

      <TaskList />
    </section>
  );
};

export default MyTasks;
