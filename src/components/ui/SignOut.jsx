"use client";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

const SignOut = () => {
  const { signOutUser } = useAuth();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="btn"
      onClick={signOutUser}
      aria-label="Sign out"
    >
      <MdClose alt="Sign out" /> Sign out
    </motion.button>
  );
};

export default SignOut;
