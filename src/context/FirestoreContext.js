"use client";
import React, { createContext, useContext } from "react";
import { db } from "@/lib/firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const { user } = useAuth();

  const checkUser = () => {
    if (!user) {
      throw new Error("No user logged in.");
    }
  };

  const addDocument = async (collectionName, data) => {
    checkUser();

    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        uid: user.uid,
        createdAt: Timestamp.fromDate(new Date()),
      });
      return docRef;
    } catch (e) {
      console.error(`Error adding new document: ${e.message}`);
      throw e;
    }
  };

  return (
    <FirestoreContext.Provider value={{ addDocument }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
