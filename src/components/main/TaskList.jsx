"use client";
import React, { useState, useReducer } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFirestore } from "@/context/FirestoreContext";
import { useTasks } from "@/context/TaskContext";
import { initialTaskState, taskReducer } from "../reducers/taskReducer";
import { MdEdit, MdDelete, MdDone } from "react-icons/md";
