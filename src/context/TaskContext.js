"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "@/lib/firebase.config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useFirestore } from "./FirestoreContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const { deleteUserDocument } = useFirestore();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const taskQuery = query(
        collection(db, "myTasks"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc")
      );
      const unsubscribe = onSnapshot(
        taskQuery,
        (snapshot) => {
          const updatedTasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(updatedTasks);
        },
        (error) => {
          console.error(`Error fetching/updating tasks: ${error}`);
        }
      );

      return () => unsubscribe();
    } else {
      setTasks([]);
    }
  }, [user]);

  const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const deleteTask = async (taskId) => {
    await deleteUserDocument("myTasks", taskId);
  };

  return (
    <TaskContext.Provider value={{ tasks, getTaskById, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
