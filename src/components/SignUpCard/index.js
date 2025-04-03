import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import "./index.css";
import { registerUser } from "../../store/usersSlice";

const SignUpCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    if (data.password === data.confirmPassword) {
      setErrorMsg("");
      setLoading(true); // Set loading state to true
      const createAccountButton = document.getElementById(
        "createAccountButton"
      );
      createAccountButton.textContent = "Creating Account...";
      createAccountButton.style.backgroundColor = "#073324";
      createAccountButton.style.fontWeight = "bolder";
      Cookies.set("jwtToken", "verified");

      const newUser = {
        username: data.username,
        email: data.email,
        nom: data.firstName,
        prenom: data.lastName,
        tel: data.phone,
        password: data.password,
        cin: data.cin || "",

        role: "client",
      };

      const res = await dispatch(registerUser(newUser));
      console.log("🚀 ~ submitForm ~ res:", res);

      if (!res.error) {
        navigate("/login");
      }
      setLoading(false); // Reset loading state after submission is complete
    } else {
      setErrorMsg("Passwords do not match");
    }
  };

  return (
    <section className="px-10 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg">
      <Link to="/">
        <h1 className="login-page-logo text-3xl">myglass</h1>
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Sign up</h1>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-4 py-3"
        >
          <label className="flex flex-col">
            <input
              type="text"
              placeholder="First Name"
              className="border rounded-md p-1.5 shadow-sm"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </label>
          <label className="flex flex-col">
            <input
              type="text"
              placeholder="Last Name"
              className="border rounded-md p-1.5 shadow-sm"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </label>
          <label className="flex flex-col">
            <input
              type="text"
              placeholder="Username"
              className="border rounded-md p-1.5 shadow-sm"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </label>
          <label className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="border rounded-md p-1.5 shadow-sm"
              {...register("email", {
                required: "Email is required",
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </label>
          <label className="flex flex-col">
            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-md p-1.5 shadow-sm"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </label>
          <label className="flex flex-col relative">
            <input
              type="password"
              placeholder="Password"
              className="border rounded-md p-1.5 shadow-sm"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </label>
          <label className="flex flex-col relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="border rounded-md p-1.5 shadow-sm"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
          {errorMsg && <p className="sign-up-error-msg">{errorMsg}</p>}
          <button
            type="submit"
            id="createAccountButton"
            className="login-button bg-[#111827] hover:bg-[#1F2937] text-white px-10 pt-2 pb-1.5"
            disabled={loading} // Disable the button during loading
          >
            {loading ? "Creating Account..." : "Create Account"}{" "}
            {/* Change text when loading */}
          </button>
          <p className="login-text">
            Already Have an Account ?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUpCard;
