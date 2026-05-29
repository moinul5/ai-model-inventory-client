import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AuthContext from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import styled from "styled-components";

function AddModel() {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    framework: "",
    useCase: "",
    dataset: "",
    description: "",
    image: "",
  });

  const frameworks = [
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-learn",
    "XGBoost",
    "JAX",
    "ONNX",
    "Other",
  ];

  const useCases = [
    "Image Classification",
    "Object Detection",
    "Natural Language Processing",
    "Time Series Forecasting",
    "Anomaly Detection",
    "Sentiment Analysis",
    "Recommendation System",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Model name is required";
    if (!formData.framework.trim())
      newErrors.framework = "Framework is required";
    if (!formData.useCase.trim()) newErrors.useCase = "Use case is required";
    if (!formData.dataset.trim()) newErrors.dataset = "Dataset is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!/^https?:\/\/.+/i.test(formData.image)) {
      newErrors.image =
        "Please enter a valid URL (must start with http:// or https://)";
    }

    if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to add a model");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const modelData = {
        ...formData,
        createdBy: user.email,
        purchased: 0,
        createdAt: new Date(),
      };

      const response = await axiosSecure.post("/add-model", modelData);

      if (response.data.insertedId) {
        toast.success("✨ Model added successfully!", {
          position: "top-right",
          autoClose: 2000,
        });

        // Reset form
        setFormData({
          name: "",
          framework: "",
          useCase: "",
          dataset: "",
          description: "",
          image: "",
        });

        // Redirect after brief delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add model. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper $darkMode={darkMode}>
      <div className="container">
        <div className="form-card mt-24 lg:mt-32">
          {/* Header */}
          <div className="form-header">
            <h1 className="title">Add New AI Model</h1>
            <p className="subtitle">
              Share your powerful AI model with our community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="form">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="label">
                Model Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., ResNet50, BERT, GPT-3"
                className={`input ${errors.name ? "error" : ""}`}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Framework Field */}
            <div className="form-group">
              <label htmlFor="framework" className="label">
                Framework <span className="required">*</span>
              </label>
              <select
                id="framework"
                name="framework"
                value={formData.framework}
                onChange={handleChange}
                className={`input ${errors.framework ? "error" : ""}`}
              >
                <option value="">Select a framework</option>
                {frameworks.map((fw) => (
                  <option key={fw} value={fw}>
                    {fw}
                  </option>
                ))}
              </select>
              {errors.framework && (
                <span className="error-text">{errors.framework}</span>
              )}
            </div>

            {/* Use Case Field */}
            <div className="form-group">
              <label htmlFor="useCase" className="label">
                Use Case <span className="required">*</span>
              </label>
              <select
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                className={`input ${errors.useCase ? "error" : ""}`}
              >
                <option value="">Select a use case</option>
                {useCases.map((uc) => (
                  <option key={uc} value={uc}>
                    {uc}
                  </option>
                ))}
              </select>
              {errors.useCase && (
                <span className="error-text">{errors.useCase}</span>
              )}
            </div>

            {/* Dataset Field */}
            <div className="form-group">
              <label htmlFor="dataset" className="label">
                Dataset <span className="required">*</span>
              </label>
              <input
                type="text"
                id="dataset"
                name="dataset"
                value={formData.dataset}
                onChange={handleChange}
                placeholder="e.g., ImageNet, Wikipedia, MNIST"
                className={`input ${errors.dataset ? "error" : ""}`}
              />
              {errors.dataset && (
                <span className="error-text">{errors.dataset}</span>
              )}
            </div>

            {/* Description Field */}
            <div className="form-group">
              <label htmlFor="description" className="label">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your AI model in detail (minimum 20 characters)..."
                rows="5"
                className={`textarea ${errors.description ? "error" : ""}`}
              />
              <span className="char-count">
                {formData.description.length} / 500
              </span>
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </div>

            {/* Image URL Field */}
            <div className="form-group">
              <label htmlFor="image" className="label">
                Image URL <span className="required">*</span>
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={`input ${errors.image ? "error" : ""}`}
              />
              {errors.image && (
                <span className="error-text">{errors.image}</span>
              )}
              {formData.image && (
                <div className="image-preview">
                  <img
                    src={formData.image}
                    alt="Preview"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Adding Model...
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Add Model
                </>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="info-box">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>
              <p className="info-title">
                Tips for successful model submission:
              </p>
              <ul className="info-list">
                <li>Use a clear, descriptive model name</li>
                <li>
                  Provide a high-quality image URL (accessible and loads
                  properly)
                </li>
                <li>
                  Write a detailed description of your model's capabilities
                </li>
                <li>Ensure all required fields are filled correctly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  background: ${({ $darkMode }) => ($darkMode ? "#000000" : "#f4f4f5")};
  color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
  transition: background 0.3s ease;
  padding: 40px 20px;

  .container {
    max-width: 700px;
    margin: 0 auto;
  }

  .form-card {
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)"};
    border: 1px solid
      ${({ $darkMode }) =>
        $darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
    border-radius: 20px;
    padding: 40px;
    box-shadow: ${({ $darkMode }) =>
      $darkMode
        ? "0 20px 50px rgba(0,0,0,0.5)"
        : "0 20px 50px rgba(0,0,0,0.08)"};
  }

  .form-header {
    text-align: center;
    margin-bottom: 36px;
  }

  .title {
    font-size: 32px;
    font-weight: 800;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 16px;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    margin: 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label {
    font-size: 14px;
    font-weight: 600;
    color: ${({ $darkMode }) => ($darkMode ? "#e5e7eb" : "#111827")};
  }

  .required {
    color: #ef4444;
  }

  .input,
  .textarea,
  select {
    padding: 12px 16px;

    background: ${({ $darkMode }) => ($darkMode ? "#000000" : "#ffffff")};

    border: 1.5px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};

    border-radius: 12px;

    color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    color-scheme: ${({ $darkMode }) => ($darkMode ? "dark" : "light")};
  }

  select option {
    background: ${({ $darkMode }) => ($darkMode ? "#000000" : "#ffffff")};

    color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
  }

  .input,
  .textarea {
    padding: 12px 16px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.04)" : "#ffffff"};
    border: 1.5px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};
    border-radius: 12px;
    font-size: 14px;
    color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
    font-family: inherit;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #06b6d4;
      box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.1);
      background: ${({ $darkMode }) =>
        $darkMode ? "rgba(6, 182, 212, 0.05)" : "rgba(6, 182, 212, 0.02)"};
    }

    &::placeholder {
      color: ${({ $darkMode }) => ($darkMode ? "#64748b" : "#9ca3af")};
    }

    &.error {
      border-color: #ef4444;
      background: ${({ $darkMode }) =>
        $darkMode ? "rgba(239, 68, 68, 0.05)" : "rgba(239, 68, 68, 0.02)"};
    }
  }

  .textarea {
    resize: vertical;
    min-height: 120px;
  }

  .error-text {
    font-size: 13px;
    color: #ef4444;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .char-count {
    font-size: 12px;
    color: ${({ $darkMode }) => ($darkMode ? "#64748b" : "#9ca3af")};
    text-align: right;
  }

  .image-preview {
    margin-top: 12px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};

    img {
      max-width: 100%;
      max-height: 300px;
      object-fit: cover;
      display: block;
    }
  }

  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    color: #000;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 8px;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(6, 182, 212, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .info-box {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(6, 182, 212, 0.1)" : "rgba(37, 99, 235, 0.08)"};
    border: 1px solid
      ${({ $darkMode }) =>
        $darkMode ? "rgba(6, 182, 212, 0.2)" : "rgba(37, 99, 235, 0.15)"};
    border-radius: 12px;
    margin-top: 24px;
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};

    svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
  }

  .info-title {
    font-weight: 600;
    margin: 0 0 8px 0;
    font-size: 14px;
  }

  .info-list {
    margin: 0;
    padding-left: 20px;
    font-size: 13px;

    li {
      margin: 4px 0;
      line-height: 1.5;
    }
  }

  @media (max-width: 640px) {
    padding: 20px 16px;

    .form-card {
      padding: 24px;
    }

    .title {
      font-size: 24px;
    }

    .submit-btn {
      width: 100%;
    }
  }
`;

export default AddModel;
