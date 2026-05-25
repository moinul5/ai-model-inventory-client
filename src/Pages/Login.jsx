import React from "react";
import styled from "styled-components";

import { useTheme } from "../Context/ThemeContext";

const Form = () => {
  const { darkMode } = useTheme();

  return (
    <StyledWrapper darkMode={darkMode}>
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
          darkMode ? "bg-black text-white" : "bg-[#f4f4f5] text-black"
        }`}
      ></div>
      <form className="form">
        {/* Heading */}
        <div className="heading">
          <h1>Welcome Back</h1>

          <p>Sign in to continue managing your AI ecosystem.</p>
        </div>

        {/* Email */}
        <div className="flex-column">
          <label>Email</label>
        </div>

        <div className="inputForm">
          <svg
            height={20}
            viewBox="0 0 32 32"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082" />
          </svg>

          <input
            type="email"
            className="input"
            placeholder="Enter your Email"
          />
        </div>

        {/* Password */}
        <div className="flex-column">
          <label>Password</label>
        </div>

        <div className="inputForm">
          <svg
            height={20}
            viewBox="-64 0 512 512"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224" />
          </svg>

          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
          />
        </div>

        {/* Remember */}
        <div className="flex-row">
          <div className="remember">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>

          <span className="span">Forgot password?</span>
        </div>

        {/* Login */}
        <button className="button-submit">Login</button>

        {/* Register */}
        <p className="p">
          Don&apos;t have an account?
          <span className="span"> Sign Up</span>
        </p>

        {/* Divider */}
        <div className="divider">
          <span></span>
          <p>Continue With</p>
          <span></span>
        </div>

        {/* Google */}
        <button className="google-btn">
          <svg
            version="1.1"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              style={{ fill: "#FBBB00" }}
              d="M113.47,309.408L95.648,375.94"
            />
          </svg>
          Continue with Google
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px;

  background: ${({ darkMode }) =>
    darkMode ? "#000000" : "#f4f4f5"};

  transition: background-color 0.3s ease;

  .form {
    width: 460px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 40px;

    border-radius: 32px;

    backdrop-filter: blur(20px);

    transition: all 0.3s ease;

    background: ${({ darkMode }) =>
      darkMode ? "#000000" : "rgba(255, 255, 255, 0.85)"};

    border: 1px solid
      ${({ darkMode }) =>
        darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};

    box-shadow: ${({ darkMode }) =>
      darkMode
        ? "0 10px 40px rgba(0,0,0,0.6)"
        : "0 10px 40px rgba(0,0,0,0.08)"};

    color: ${({ darkMode }) => (darkMode ? "#ffffff" : "#111827")};
  }

  .heading {
    text-align: center;
    margin-bottom: 10px;
  }

  .heading h1 {
    font-size: 38px;
    font-weight: 800;
  }

  .heading p {
    margin-top: 8px;

    color: ${({ darkMode }) => (darkMode ? "#94a3b8" : "#6b7280")};
  }

  .flex-column label {
    font-size: 14px;
    font-weight: 600;

    color: ${({ darkMode }) => (darkMode ? "#e5e7eb" : "#111827")};
  }

  .inputForm {
    height: 58px;

    display: flex;
    align-items: center;

    padding: 0 16px;

    border-radius: 16px;

    transition: 0.3s ease;

    background: ${({ darkMode }) =>
      darkMode ? "rgba(255,255,255,0.04)" : "#ffffff"};

    border: 1.5px solid
      ${({ darkMode }) => (darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};
  }

  .inputForm:focus-within {
    border-color: ${({ darkMode }) => (darkMode ? "#06b6d4" : "#2563eb")};

    box-shadow: ${({ darkMode }) =>
      darkMode
        ? "0 0 0 4px rgba(6,182,212,0.1)"
        : "0 0 0 4px rgba(37,99,235,0.1)"};
  }

  .inputForm svg {
    fill: ${({ darkMode }) => (darkMode ? "#94a3b8" : "#6b7280")};
  }

  .input {
    width: 100%;
    height: 100%;

    margin-left: 12px;

    border: none;
    outline: none;

    background: transparent;

    font-size: 15px;

    color: ${({ darkMode }) => (darkMode ? "#ffffff" : "#111827")};
  }

  .input::placeholder {
    color: ${({ darkMode }) => (darkMode ? "#64748b" : "#9ca3af")};
  }

  .flex-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remember {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .remember label {
    font-size: 14px;

    color: ${({ darkMode }) => (darkMode ? "#cbd5e1" : "#374151")};
  }

  .span {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    transition: 0.3s ease;

    color: ${({ darkMode }) => (darkMode ? "#06b6d4" : "#2563eb")};
  }

  .span:hover {
    opacity: 0.8;
  }

  .button-submit {
    height: 58px;

    border: none;
    border-radius: 16px;

    font-size: 16px;
    font-weight: 700;

    cursor: pointer;

    transition: 0.3s ease;

    background: ${({ darkMode }) => (darkMode ? "#06b6d4" : "#2563eb")};

    color: ${({ darkMode }) => (darkMode ? "#000000" : "#ffffff")};
  }

  .button-submit:hover {
    transform: translateY(-2px);
    background: ${({ darkMode }) => (darkMode ? "#0891b2" : "#1d4ed8")};
  }

  .p {
    text-align: center;
    font-size: 14px;

    color: ${({ darkMode }) => (darkMode ? "#cbd5e1" : "#374151")};
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 14px;

    margin: 10px 0;
  }

  .divider span {
    flex: 1;
    height: 1px;

    background: ${({ darkMode }) =>
      darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb"};
  }

  .divider p {
    font-size: 13px;

    color: ${({ darkMode }) => (darkMode ? "#94a3b8" : "#6b7280")};
  }

  .google-btn {
    height: 58px;

    border-radius: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    cursor: pointer;

    font-size: 15px;
    font-weight: 600;

    transition: 0.3s ease;

    background: ${({ darkMode }) =>
      darkMode ? "rgba(255,255,255,0.05)" : "#ffffff"};

    color: ${({ darkMode }) => (darkMode ? "#ffffff" : "#111827")};

    border: 1.5px solid
      ${({ darkMode }) => (darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};
  }

  .google-btn:hover {
    transform: translateY(-2px);

    border-color: ${({ darkMode }) => (darkMode ? "#06b6d4" : "#2563eb")};
  }
`;

export default Form;
