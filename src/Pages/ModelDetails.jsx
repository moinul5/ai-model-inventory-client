import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import AuthContext from "../Context/AuthContext";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";

function ModelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { user } = useContext(AuthContext);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [purchased, setPurchased] = useState(0);

  // Fetch model details
  useEffect(() => {
    const fetchModelDetails = async () => {
      try {
        setLoading(true);

        const response = await axiosSecure.get(`model/${id}`);

        if (response.data) {
          setModel(response.data);
          setPurchased(response.data.purchased || 0);
          console.log("Model details:", response.data);
        } else {
          toast.error("Model not found");
          navigate("/all-models");
        }
      } catch (error) {
        console.error("Error fetching model details:", error);
        toast.error("Failed to load model details");
        navigate("/all-models");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchModelDetails();
    }
  }, [id, navigate, axiosSecure]);

  // Handle Purchase
  const handlePurchase = async () => {
    if (!user) {
      toast.error("Please login to purchase");
      navigate("/login");
      return;
    }

    try {
      setIsPurchasing(true);
      axiosSecure.post(`/purchase/${id}`).then((response) => {
        if (response.data.success) {
          toast.success("Model purchased successfully");
          setPurchased((prev) => prev + 1);
        }
      });
    } catch (error) {
      console.error("Error purchasing model:", error);
      toast.error("Failed to purchase model");
    } finally {
      setIsPurchasing(false);
    }
  };

  // Handle Edit
  const handleEdit = () => {
    navigate(`/edit-model/${id}`);
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this model?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await axiosSecure.delete(`/model/${id}`);
      toast.success("Model deleted successfully");
      navigate("/my-models");
    } catch (error) {
      console.error("Error deleting model:", error);
      toast.error("Failed to delete model");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-500 pt-20 ${
          darkMode ? "bg-black text-white" : "bg-[#f4f4f5] text-black"
        }`}
      >
        <Loader />
      </div>
    );
  }

  if (!model) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-500 pt-20 ${
          darkMode ? "bg-black text-white" : "bg-[#f4f4f5] text-black"
        }`}
      >
        <p className="text-xl">Model not found</p>
      </div>
    );
  }

  const isCreator = user && model.createdBy === user.email;

  return (
    <div
      className={`min-h-screen transition-all duration-500 pt-20 pb-10 ${
        darkMode ? "bg-black text-white" : "bg-[#f4f4f5] text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/all-models")}
            className={`text-sm hover:underline ${
              darkMode ? "text-cyan-400" : "text-blue-600"
            }`}
          >
            ← Back to Models
          </button>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Model Image */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-2xl overflow-hidden shadow-lg mb-8 ${
                darkMode ? "bg-black/50 border border-white/10" : "bg-white"
              }`}
            >
              {model.image ? (
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div
                  className={`w-full h-96 flex items-center justify-center ${
                    darkMode
                      ? "bg-linear-to-b from-slate-800 to-slate-900"
                      : "bg-linear-to-b from-gray-100 to-gray-200"
                  }`}
                >
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            {/* Model Details */}
            <div
              className={`rounded-2xl p-8 shadow-lg ${
                darkMode
                  ? "bg-black/50 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-black mb-2">{model.name}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      darkMode
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {model.framework}
                  </span>
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Created by: {model.createdBy}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-white/10">
                <div
                  className={`p-4 rounded-xl ${
                    darkMode
                      ? "bg-white/5 border border-white/10"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Times Purchased
                  </p>
                  <p className="text-2xl font-black mt-2">
                    {purchased || 0}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-xl ${
                    darkMode
                      ? "bg-white/5 border border-white/10"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Created Date
                  </p>
                  <p className="text-sm font-bold mt-2">
                    {new Date(model.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Use Case */}
              {model.useCase && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-3">Use Case</h2>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {model.useCase}
                  </p>
                </div>
              )}

              {/* Dataset */}
              {model.dataset && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-3">Dataset</h2>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {model.dataset}
                  </p>
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-lg font-bold mb-3">Description</h2>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } leading-relaxed`}
                >
                  {model.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Actions Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-2xl p-6 shadow-lg sticky top-24 ${
                darkMode
                  ? "bg-black/50 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className={`w-full py-3 px-4 rounded-xl font-bold text-lg mb-4 transition-all duration-300 ${
                  darkMode
                    ? "bg-cyan-500 hover:bg-cyan-600 text-black disabled:opacity-50"
                    : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                }`}
              >
                {isPurchasing ? "Processing..." : "Purchase Model"}
              </button>

              {/* Creator Actions */}
              {isCreator && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <p
                    className={`text-xs font-bold uppercase ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Creator Tools
                  </p>
                  <button
                    onClick={handleEdit}
                    className={`w-full py-2 px-4 rounded-xl font-bold transition-all duration-300 ${
                      darkMode
                        ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30"
                        : "bg-amber-100 hover:bg-amber-200 text-amber-600 border border-amber-300"
                    }`}
                  >
                    ✏️ Edit Model
                  </button>
                  <button
                    onClick={handleDelete}
                    className={`w-full py-2 px-4 rounded-xl font-bold transition-all duration-300 ${
                      darkMode
                        ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                        : "bg-red-100 hover:bg-red-200 text-red-600 border border-red-300"
                    }`}
                  >
                    🗑️ Delete Model
                  </button>
                </div>
              )}

              {/* Info for non-creators */}
              {!isCreator && (
                <div
                  className={`mt-4 pt-4 border-t border-white/10 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <p>
                    Model by <strong>{model.createdBy}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelDetails;
