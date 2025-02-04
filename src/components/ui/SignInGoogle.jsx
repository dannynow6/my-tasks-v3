import { useAuth } from "@/context/AuthContext";
import { FaGoogle } from "react-icons/fa6";

const SignInGoogle = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <button
      className="btn"
      onClick={signInWithGoogle}
      aria-label="Sign in with Google account"
    >
      <FaGoogle alt="Sign in with Google account" /> Sign in
    </button>
  );
};

export default SignInGoogle;
