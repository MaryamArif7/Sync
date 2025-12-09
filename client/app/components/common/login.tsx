import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUserContext } from "@/app/store/UserContext";
interface LoginProps {
  onClose: () => void;
}

export const Login = ({ onClose }: LoginProps) => {
  const [loader, setLoader] = useState(false);
  const {user,roomId,setUser}=useUserContext();
  const payload: {name: string} = {};
  const router=useRouter();
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
          console.log("after sign out",user);
           if (user) {
          setUser(() => ({
            ...user,
           
            name: payload.name,
          }));
        }
         router.push("/browse");
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
{/**
  res obj 
{data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
config
: 
{transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
data
: 
{token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…g1NH0.cWj_d40dT2EMTfkb--Q7a70RGrOfTvdtLZq8U8Zi6pU'}
headers
: 
AxiosHeaders {content-length: '188', content-type: 'application/json; charset=utf-8'}
request
: 
XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
status
: 
200
statusText
: 
"OK"
[[Prototype]]
: 
Object
  
  
  after sign out 
  app_70c64f2e._.js:585 after sign out 
UserImpl {providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'ThoMUUF1mWcN2ielXakpRC911xo1', …}
accessToken
: 
"eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MTg5MTkxMTA3NjA1NDM0NGUxNWUyNTY0MjViYjQyNWVlYjNhNWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVGFlIFRhZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMdzJyM2l3VFBLTDZhUHhGdEFyV1d1LTV2aE9ZcVpXRUtKSWhaT3VFQUxBd0p1cWc9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3luYy04NzdjYSIsImF1ZCI6InN5bmMtODc3Y2EiLCJhdXRoX3RpbWUiOjE3NjUyNjU4NTMsInVzZXJfaWQiOiJUaG9NVVVGMW1XY04yaWVsWGFrcFJDOTExeG8xIiwic3ViIjoiVGhvTVVVRjFtV2NOMmllbFhha3BSQzkxMXhvMSIsImlhdCI6MTc2NTI2NTg1MywiZXhwIjoxNzY1MjY5NDUzLCJlbWFpbCI6Ind3dy50YWV0YWUzMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNDM4MTY1NjA4MDM1NzAxNDQzMCJdLCJlbWFpbCI6WyJ3d3cudGFldGFlMzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.FM3izY7BxpuUq_HPTwFaM5ng5T0seyh8gR5Udp-M4qCJTjrz7yhCHEE1-SPxc5c1d6UbTMBn_9oZAV6s24syN1qN5LKdqbo8-VPEjmy_G0LyKAJekuzTHf2pLTkwI7v-24NKmSWtVGRFpggduo4Wtrq1n-W8FlgROiNcQ8hn7PJg9mXPazzCI0tQ8f_WyK3QcyETV_VJtz3srVP5y6SBZ6HhEsGFG7eor2kTSBhU-fs80NYWITCQSv1G5kPagP8s83_eUJOwto1IQa8K292ffGpC3MTTsPHFrvecE006UyRJMU0ZJZnuYdBgR87BDvCfgDZFgpZnJ-FW2ZfWlXjklA"
auth
: 
AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, appCheckServiceProvider: Provider, config: {…}, currentUser: null, …}
displayName
: 
"Tae Tae"
email
: 
"www.taetae31@gmail.com"
emailVerified
: 
true
isAnonymous
: 
false
metadata
: 
UserMetadata {createdAt: '1764329970465', lastLoginAt: '1765265717503', lastSignInTime: 'Tue, 09 Dec 2025 07:35:17 GMT', creationTime: 'Fri, 28 Nov 2025 11:39:30 GMT'}
phoneNumber
: 
null
photoURL
: 
"https://lh3.googleusercontent.com/a/ACg8ocLw2r3iwTPKL6aPxFtArWWu-5vhOYqZWEKJIhZOuEALAwJuqg=s96-c"
proactiveRefresh
: 
ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
providerData
: 
[{…}]
providerId
: 
"firebase"
reloadListener
: 
null
reloadUserInfo
: 
{localId: 'ThoMUUF1mWcN2ielXakpRC911xo1', email: 'www.taetae31@gmail.com', displayName: 'Tae Tae', photoUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLw2r3iwTPKL6aPxFtArWWu-5vhOYqZWEKJIhZOuEALAwJuqg=s96-c', emailVerified: true, …}
stsTokenManager
: 
StsTokenManager {refreshToken: 'AMf-vBxQhZrirKFeIx9S6vFKsW3ihrMXzOI-QoKZaSrR0OyOdV…r8nxkhdUvQY7z73PXOZ4SoFLxxwckpBQpAkEBxz1LxpuwYVLA', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MTg5MTkxMTA3NjA1ND…006UyRJMU0ZJZnuYdBgR87BDvCfgDZFgpZnJ-FW2ZfWlXjklA', expirationTime: 1765269452359}
tenantId
: 
null
uid
: 
"ThoMUUF1mWcN2ielXakpRC911xo1"
refreshToken
: 
(...)
  */}