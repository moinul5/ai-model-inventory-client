import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import ModelCard from "../Components/ModelCard";
import { useTheme } from "../Context/ThemeContext";
import Loader from "../Components/Loader";
import styled from "styled-components";

function AllModels() {
  const axiosInstance = useAxios();
  const { darkMode } = useTheme();
  const [initialLoading, setInitialLoading] = useState(true);
  const [modelLoading, setModelLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [framework, setFramework] = useState("");

  const frameworks = [
    "All Frameworks",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-learn",
    "XGBoost",
    "JAX",
    "ONNX",
    "Other",
  ];

  // Initial fetch on component mount
  useEffect(() => {
    axiosInstance
      .get("/models")
      .then((response) => {
        setModels(response.data);
        setInitialLoading(false);
      })
      .catch((error) => {
        setInitialLoading(false);
      });
  }, [axiosInstance]);

  // Fetch models with filters (search/framework)
  useEffect(() => {
    setModelLoading(true);

    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (framework && framework !== "All Frameworks") {
      params.append("framework", framework);
    }

    const timer = setTimeout(() => {
      axiosInstance
        .get(`/models?${params.toString()}`)
        .then((response) => {
          setModels(response.data);
          setModelLoading(false);
        })
        .catch((error) => {
          setModelLoading(false);
        });
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [search, framework, axiosInstance]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFrameworkChange = (e) => {
    setFramework(e.target.value);
  };

  const clearFilters = () => {
    setSearch("");
    setFramework("");
  };

  if (initialLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <StyledWrapper $darkMode={darkMode}>
      <div className="max-w-7xl mx-auto px-4 py-10 mt-24">
        {/* Header */}
        <div className="header">
          <div>
            <h1 className="title">All AI Models</h1>
            <p className="subtitle">Explore our collection of powerful AI models</p>
          </div>
          <div className="model-count">
            <span className="count-badge">{models.length}</span>
            <p className="count-text">Models Available</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          {/* Search Bar */}
          <div className="search-box">
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
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search models by name..."
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
            {search && (
              <button className="clear-btn" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          {/* Framework Filter */}
          <div className="filter-box">
            <label htmlFor="framework-select" className="filter-label">
              Framework:
            </label>
            <select
              id="framework-select"
              value={framework}
              onChange={handleFrameworkChange}
              className="filter-select"
            >
              {frameworks.map((fw) => (
                <option key={fw} value={fw === "All Frameworks" ? "" : fw}>
                  {fw}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {(search || framework) && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Info */}
        <div className="results-info">
          {search && (
            <p>
              Search results for <strong>"{search}"</strong>
            </p>
          )}
          {framework && framework !== "All Frameworks" && (
            <p>
              Filtering by <strong>{framework}</strong>
            </p>
          )}
          <p className="result-count">
            Found <strong>{models.length}</strong> model{models.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Models Grid or Empty State */}
        {modelLoading ? (
          <div className="models-loading">
            <Loader />
          </div>
        ) : models.length === 0 ? (
          <div className="empty-state">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <h2>No models found</h2>
            <p>Try adjusting your search or filter criteria</p>
            <button className="reset-btn" onClick={clearFilters}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="models-grid">
            {models.map((model) => (
              <ModelCard key={model._id} model={model} />
            ))}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  background: ${({ $darkMode }) => ($darkMode ? "#000000" : "#f4f4f5")};
  color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
  transition: background 0.3s ease;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 20px;
  }

  .title {
    font-size: 36px;
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

  .model-count {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 24px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(6, 182, 212, 0.1)" : "rgba(37, 99, 235, 0.1)"};
    border-radius: 12px;
    border: 1px solid
      ${({ $darkMode }) =>
        $darkMode ? "rgba(6, 182, 212, 0.2)" : "rgba(37, 99, 235, 0.2)"};
  }

  .count-badge {
    font-size: 32px;
    font-weight: 700;
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
  }

  .count-text {
    font-size: 12px;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .filters-section {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .search-box {
    flex: 1;
    min-width: 250px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-box svg {
    position: absolute;
    left: 16px;
    color: ${({ $darkMode }) => ($darkMode ? "#64748b" : "#9ca3af")};
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.04)" : "#ffffff"};
    border: 1.5px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};
    border-radius: 12px;
    font-size: 14px;
    color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
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
  }

  .clear-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: ${({ $darkMode }) => ($darkMode ? "#94a3b8" : "#6b7280")};
    cursor: pointer;
    font-size: 18px;
    padding: 4px 8px;
    transition: color 0.2s;

    &:hover {
      color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#374151")};
    }
  }

  .filter-box {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-label {
    font-weight: 600;
    font-size: 14px;
    color: ${({ $darkMode }) => ($darkMode ? "#e5e7eb" : "#111827")};
  }

  .filter-select {
    padding: 12px 16px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.04)" : "#ffffff"};
    border: 1.5px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")};
    border-radius: 12px;
    font-size: 14px;
    color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
    cursor: pointer;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #06b6d4;
      box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.1);
    }

    option {
      background: ${({ $darkMode }) => ($darkMode ? "#1f2937" : "#ffffff")};
      color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
    }
  }

  .clear-filters-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.08)"};
    border: 1px solid
      ${({ $darkMode }) =>
        $darkMode ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.2)"};
    border-radius: 10px;
    color: #ef4444;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${({ $darkMode }) =>
        $darkMode ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.12)"};
    }
  }

  .results-info {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    padding: 12px 16px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(6, 182, 212, 0.08)" : "rgba(37, 99, 235, 0.08)"};
    border-radius: 10px;
    border: 1px solid
      ${({ $darkMode }) =>
        $darkMode ? "rgba(6, 182, 212, 0.15)" : "rgba(37, 99, 235, 0.15)"};
    font-size: 14px;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    flex-wrap: wrap;

    strong {
      color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    text-align: center;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)"};
    border-radius: 20px;
    border: 2px dashed
      ${({ $darkMode }) =>
        $darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};

    svg {
      color: ${({ $darkMode }) => ($darkMode ? "#64748b" : "#9ca3af")};
      margin-bottom: 20px;
    }

    h2 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    p {
      font-size: 16px;
      color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
      margin: 0 0 24px 0;
      max-width: 400px;
    }
  }

  .reset-btn {
    padding: 10px 24px;
    background: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    color: ${({ $darkMode }) => ($darkMode ? "#000" : "#fff")};
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ $darkMode }) =>
        $darkMode
          ? "0 10px 25px rgba(6, 182, 212, 0.3)"
          : "0 10px 25px rgba(37, 99, 235, 0.3)"};
    }
  }

  .models-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .models-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    padding: 40px;
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
    }

    .title {
      font-size: 28px;
    }

    .filters-section {
      flex-direction: column;
    }

    .search-box {
      min-width: 100%;
    }

    .filter-box {
      width: 100%;
    }

    .filter-select {
      width: 100%;
    }

    .results-info {
      flex-direction: column;
    }

    .models-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
  }
`;

export default AllModels;
