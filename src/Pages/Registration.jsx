import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { useTheme } from "../Context/ThemeContext";
import AuthContext from "../Context/AuthContext";

function Registration() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { createUser, loading, setLoading, signInWithGoogle } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  // Password validation rules
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowercase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!isLongEnough) {
      return "Password must be at least 6 characters long";
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);

    try {
      // Create user using createUser from AuthContext
      const userCredential = await createUser(formData.email, formData.password);
      const user = userCredential.user;

      // Update user profile with name and photo URL
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL || "https://via.placeholder.com/150",
      });

      toast.success("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else {
        toast.error(error.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      // Use signInWithGoogle from AuthContext
      const result = await signInWithGoogle();

      toast.success("Google sign-up successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Sign-up cancelled");
      } else {
        toast.error(error.message || "Google sign-up failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper $darkMode={darkMode}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
          darkMode ? "bg-black text-white" : "bg-[#f4f4f5] text-black"
        }`}
      >
        <form className="form" onSubmit={handleRegister}>
          {/* Heading */}
          <div className="heading">
            <h1>Register</h1>
            <p>Create your AI Model Inventory Manager account</p>
          </div>

          {/* Name */}
          <div className="flex-column">
            <label>Full Name</label>
          </div>
          <div className="inputForm">
            <svg
              height={20}
              viewBox="0 0 24 24"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
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
              name="email"
              className="input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Photo URL */}
          <div className="flex-column">
            <label>Photo URL (Optional)</label>
          </div>
          <div className="inputForm">
            <svg
              height={20}
              viewBox="0 0 24 24"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <input
              type="url"
              name="photoURL"
              className="input"
              placeholder="Enter your photo URL"
              value={formData.photoURL}
              onChange={handleInputChange}
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
              name="password"
              className="input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Requirements */}
          <div className="password-requirements">
            <p className="req-title">Password Requirements:</p>
            <ul>
              <li className={formData.password.length >= 6 ? "valid" : ""}>
                ✓ At least 6 characters
              </li>
              <li className={/[A-Z]/.test(formData.password) ? "valid" : ""}>
                ✓ One uppercase letter
              </li>
              <li className={/[a-z]/.test(formData.password) ? "valid" : ""}>
                ✓ One lowercase letter
              </li>
            </ul>
          </div>

          {/* Register Button */}
          <button 
            className="button-submit" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="p">
            Already have an account?
            <Link to="/login" className="span"> Sign In</Link>
          </p>

          {/* Divider */}
          <div className="divider">
            <span></span>
            <p>Or Sign Up With</p>
            <span></span>
          </div>

          {/* Google Button */}
          <button 
            className="google-btn" 
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
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
            Sign Up with Google
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px;

  background: ${({ $darkMode }) => ($darkMode ? "#000000" : "#f4f4f5")};

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

    background: ${({ $darkMode }) =>
      $darkMode ? "#000000" : "rgba(255, 255, 255, 0.85)"};

    border: 1px solid
      ${({ $darkMode }) =>
        $darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};

    box-shadow: ${({ $darkMode }) =>
      $darkMode
        ? "0 10px 40px rgba(0,0,0,0.6)"
        : "0 10px 40px rgba(0,0,0,0.08)"};

    color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
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

    color: ${({ $darkMode }) => ($darkMode ? "#94a3b8" : "#6b7280")};
  }

  .flex-column label {
    font-size: 14px;
    font-weight: 600;

    color: ${({ $darkMode }) => ($darkMode ? "#e5e7eb" : "#111827")};
  }

  .inputForm {
    height: 58px;

    display: flex;
    align-items: center;

    padding: 0 16px;

    border-radius: 16px;

    transition: 0.3s ease;

    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.04)" : "#ffffff"};

    border: 1.5px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};
  }

  .inputForm:focus-within {
    border-color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};

    box-shadow: ${({ $darkMode }) =>
      $darkMode
        ? "0 0 0 4px rgba(6,182,212,0.1)"
        : "0 0 0 4px rgba(37,99,235,0.1)"};
  }

  .inputForm svg {
    fill: ${({ $darkMode }) => ($darkMode ? "#94a3b8" : "#6b7280")};
    stroke: ${({ $darkMode }) => ($darkMode ? "#94a3b8" : "#6b7280")};
  }

  .input {
    width: 100%;
    height: 100%;

    margin-left: 12px;

    border: none;
    outline: none;

    background: transparent;

    font-size: 15px;

    color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
  }

  .input:-webkit-autofill,
  .input:-webkit-autofill:hover,
  .input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px ${({ $darkMode }) => ($darkMode ? "#0a0a0a" : "#ffffff")} inset !important;
    -webkit-text-fill-color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")} !important;
  }

  .input::placeholder {
    color: ${({ $darkMode }) => ($darkMode ? "#64748b" : "#9ca3af")};
  }

  .password-requirements {
    margin: 8px 0 8px 0;
    padding: 12px 16px;
    border-radius: 12px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.04)" : "#f0f9ff"};
    border: 1px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(6,182,212,0.2)" : "#e0f2fe")};
  }

  .password-requirements .req-title {
    font-size: 12px;
    font-weight: 600;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#374151")};
    margin-bottom: 8px;
  }

  .password-requirements ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .password-requirements li {
    font-size: 12px;
    color: ${({ $darkMode }) => ($darkMode ? "#94a3b8" : "#6b7280")};
    transition: color 0.2s ease;
  }

  .password-requirements li.valid {
    color: ${({ $darkMode }) => ($darkMode ? "#10b981" : "#059669")};
    font-weight: 500;
  }

  .span {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: 0.3s ease;
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }

  .button-submit {
    height: 58px;

    border: none;
    border-radius: 16px;

    font-size: 16px;
    font-weight: 700;

    cursor: pointer;

    transition: 0.3s ease;

    background: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};

    color: ${({ $darkMode }) => ($darkMode ? "#000000" : "#ffffff")};

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      background: ${({ $darkMode }) => ($darkMode ? "#0891b2" : "#1d4ed8")};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .p {
    text-align: center;
    font-size: 14px;

    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#374151")};
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

    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb"};
  }

  .divider p {
    font-size: 13px;

    color: ${({ $darkMode }) => ($darkMode ? "#94a3b8" : "#6b7280")};
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

    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.05)" : "#ffffff"};

    color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};

    border: 1.5px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      border-color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

export default Registration;