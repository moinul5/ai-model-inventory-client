import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AuthContext from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import Loader from "../Components/Loader";

function UpdateModel() {
  const axiosSecure = useAxiosSecure();
  const { darkMode } = useTheme();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

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

  useEffect(() => {
    axiosSecure
      .get(`/model/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          framework: res.data.framework || "",
          useCase: res.data.useCase || "",
          dataset: res.data.dataset || "",
          description: res.data.description || "",
          image: res.data.image || "",
        });

        setPageLoading(false);
      })
      .catch(() => {
        toast.error("Failed loading model");
        // navigate("/");
      });
  }, [id, axiosSecure, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return (
      formData.name &&
      formData.framework &&
      formData.useCase &&
      formData.dataset &&
      formData.description.length >= 20 &&
      formData.image
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Fill all fields correctly");
      return;
    }

    if (!user) {
      toast.error("Login required");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosSecure.patch(
        `/update-model/${id}`,
        {
          ...formData,
          updatedAt: new Date(),
        }
      );

      if (
        response.data.modifiedCount > 0 ||
        response.data.matchedCount > 0
      ) {
        toast.success("Model Updated Successfully!");

        navigate(`/model/${id}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <Wrapper $darkMode={darkMode}>
      <div className="card mt-24">

        <h1>Update Model</h1>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Model Name"
          />

          <select
            name="framework"
            value={formData.framework}
            onChange={handleChange}
          >
            {frameworks.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            name="useCase"
            value={formData.useCase}
            onChange={handleChange}
          >
            {useCases.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            name="dataset"
            value={formData.dataset}
            onChange={handleChange}
            placeholder="Dataset"
          />

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          {formData.image && (
            <img
              src={formData.image}
              alt=""
              className="preview"
            />
          )}

          <button disabled={loading}>
            {loading ? "Updating..." : "Update Model"}
          </button>

        </form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`

min-height:100vh;
padding:40px;

background:${({ $darkMode }) =>
  $darkMode ? "#000" : "#f4f4f4"};

display:flex;
justify-content:center;

.card{

width:700px;
padding:40px;
border-radius:20px;

background:${({ $darkMode }) =>
  $darkMode ? "#111827" : "#fff"};

display:flex;
flex-direction:column;
gap:20px;

}

form{
display:flex;
flex-direction:column;
gap:18px;
}

input,
textarea,
select{

padding:14px;
border-radius:10px;

background:${({ $darkMode }) =>
  $darkMode ? "#1f2937" : "#fff"};

color:${({ $darkMode }) =>
  $darkMode ? "#fff" : "#111"};

border:1px solid #374151;

}

select option{

background:${({ $darkMode }) =>
  $darkMode ? "#111827" : "#fff"};

color:${({ $darkMode }) =>
  $darkMode ? "#fff" : "#111"};

}

button{

padding:14px;
border:none;
border-radius:10px;

font-weight:700;
cursor:pointer;

background:${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};

color:${({ $darkMode }) => ($darkMode ? "#000" : "#fff")};

transition: all 0.3s ease;

&:hover:not(:disabled){
  transform: translateY(-2px);
  box-shadow: ${({ $darkMode }) =>
    $darkMode
      ? "0 10px 25px rgba(6, 182, 212, 0.3)"
      : "0 10px 25px rgba(37, 99, 235, 0.3)"};
}

&:disabled{
  opacity: 0.6;
  cursor: not-allowed;
}

}

.preview{

max-width:250px;
border-radius:10px;

}

`;

export default UpdateModel;