"use client";
import { useAuth } from "@/context/AuthContext";
import SignInGoogle from "../ui/SignInGoogle";
import AddTask from "./AddTask";
import AddTaskModal from "./AddTaskModal";

const MyTasks = () => {
  const { user } = useAuth();

  return (
    <section className="flex flex-col w-full h-screen items-center justify-center gap-4">
      {user ? <AddTask /> : <SignInGoogle />}
      <AddTaskModal />
    </section>
  );
};

export default MyTasks;
