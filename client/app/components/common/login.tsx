import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
interface LoginProps {
  onClose: () => void;
}

export const Login = ({ onClose }: LoginProps) => {
  const [loader, setLoader] = useState(false);
  const handleLogin = async () => {
    try {
      setLoader(true);
      const res = await signInWithPopup(auth, provider);
      console.log("from login compoeent",res);
      const user = res.user;
      if (user) {
        const response = await axios.post("http://localhost:5000/login", {
          token: await user.getIdToken(),
        });
        console.log("res obj",response);
        if (response.status===200) {
          await axios.post("/api/login", { token: (response.data )?.token });
          await signOut(auth);
         // window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/10  backdrop-blur-sm  z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className=" backdrop-blur-sm-  relative border border-[#3e2f5c] rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors hover:rotate-90 duration-300 p-1 rounded-full hover:bg-white/10"
          aria-label="Close"
        >
          {/* <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg> */}
        </button>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-center mb-8 space-y-2">
            <h1 className="font-bold text-3xl mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-base">
              Lets start listening together
            </p>
          </div>

          <button
            onClick={handleLogin}
            disabled={loader}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-800  rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FcGoogle className="w-6 h-6" />
            <span>{loader ? "Signing in..." : "Continue with Google"}</span>
          </button>

          <p className="text-gray-500 text-xs text-center mt-6 max-w-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
