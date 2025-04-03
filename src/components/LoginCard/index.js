import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import { signIn } from "../../store/authSlice";

const LoginCard = () => {
  // State
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect");
  console.log("🚀 ~ LoginCard ~ redirectPath:", redirectPath);

  const submitForm = async (event) => {
    event.preventDefault();

    if (emailInput !== "" && passwordInput !== "") {
      setIsLoading(true); // Set loading state to true when the request starts

      try {
        const res = await dispatch(
          signIn({ email: emailInput, password: passwordInput })
        );

        const user = res?.payload?.user;

        if (user) {
          setErrorMsg("");
          // After successful login, navigate to the correct page after a delay
          setTimeout(() => {
            if (user.role === "admin") {
              if (redirectPath) {
                navigate(redirectPath);
              } else {
                navigate("/admin");
              }
            } else {
              if (redirectPath) {
                navigate(redirectPath);
              } else {
                navigate("/");
              }
            }
          }, 2000);
        } else {
          setErrorMsg("Email OR Password are invalid");
        }
      } catch (error) {
        setErrorMsg("An error occurred. Please try again.");
      } finally {
        setIsLoading(false); // Set loading state to false when the request is done
      }
    }
  };

  return (
    <>
      <section className="px-7 py-10 rounded-md shadow-md bg-white/70 flex flex-col gap-6 w-full max-w-lg">
        <Link to="/">
          <h1 className="login-page-logo text-3xl">myglass</h1>
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold mb-3">Login to your account</h1>
          <form className="flex flex-col gap-3" onSubmit={submitForm}>
            <label className="flex flex-col">
              Email
              <input
                type="email"
                className="border rounded-md p-1.5 shadow-sm"
                id="signUpEmail"
                value={emailInput}
                onChange={(event) => setEmailInput(event.target.value)}
                required
              />
            </label>
            <label className="flex flex-col">
              Password
              <input
                type="password"
                className="border rounded-md p-1.5 shadow-sm"
                id="signUpPassword"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                required
              />
            </label>
            {errorMsg !== "" && <p className="login-error-msg">{errorMsg}</p>}
            <div className="w-full py-2 flex flex-col gap-4 items-center">
              <button
                type="submit"
                id="loginButton"
                className={`login-button ${
                  isLoading ? "bg-gray-500" : "bg-[#111827] hover:bg-[#1F2937]"
                } text-white px-10 pt-2 pb-1.5`}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? "Logging In..." : "Login"}
              </button>
              <button
                type="button"
                className="guest-button border border-black px-10 pt-2 pb-1.5"
                onClick={() => {
                  setEmailInput("shakil@gmail.com");
                  setPasswordInput("shakil@123");
                }}
              >
                Login as Guest
              </button>
              <Link to="/signup" className="underline text-gray-600">
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginCard;
