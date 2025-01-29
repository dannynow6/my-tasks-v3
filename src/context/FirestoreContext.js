"use client";
import React, { createContext, useContext } from "react";
import { db } from "@/lib/firebase.config";
import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
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

  const updateDocument = async (collectionName, data, docId) => {
    checkUser();

    try {
      if (docId) {
        const docRef = doc(db, collectionName, docId);
        await setDoc(
          docRef,
          { ...data, uid: user.uid, updatedAt: Timestamp.fromDate(new Date()) },
          { merge: true }
        );
      }
    } catch (e) {
      console.error(`Error updating document: ${e.message}`);
    }
  };

  const deleteUserDocument = async (collectionName, docId) => {
    checkUser();

    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().uid === user.uid) {
        await deleteDoc(docRef);
        console.log(`Doc ${docId} has been deleted`);
      } else {
        throw new Error("You don't have permission to delete this document.");
      }
    } catch (e) {
      console.error(`Error deleting document: ${e.message}`);
    }
  };

  const updateDocStatus = async (taskId, taskStatus) => {
    const taskDocRef = doc(db, "myTasks", taskId);

    try {
      await updateDoc(taskDocRef, {
        isComplete: !taskStatus,
      });
    } catch (e) {
      console.error(`Error updating task status: ${e.message}`);
    }
  };

  return (
    <FirestoreContext.Provider
      value={{
        addDocument,
        updateDocument,
        deleteUserDocument,
        updateDocStatus,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
