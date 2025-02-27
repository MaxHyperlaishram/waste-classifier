import axios from "axios";

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import loading_gif from "./assets/loading.gif";

function WasteClassifier() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // null is falsy
  const [preview, setPreview] = useState(null);
  const [canLoad, setCanLoad] = useState(null);
  const [classification, setClassification] = useState(""); // New state for storing result
  const [confidence, setConfidence] = useState("");
  const fileInputRef = useRef(null); // Reference to the file input

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview of the image
      setClassification(""); // Reset classification when new image is uploaded
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    setClassification(""); // Clear everything

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle classification button click
  const handleClassify = async () => {
    setCanLoad(true);
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image); // 'file' key matches the Flask request

    try {
      const response = await axios.post(
        "http://localhost:3000/classify",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setCanLoad(false);
      setClassification(response.data["label"]);
      setConfidence(response.data["confidence"]);
      // setClassification(response.data.classification); // Update classification result
    } catch (error) {
      console.error("Error classifying waste:", error);
      alert("Error classifying image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-500 p-4">
      {canLoad ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <img src={loading_gif} className="w-32 h-32" alt="" />
        </div>
      ) : null}

      <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
        Waste Classification System
      </div>
      {/* Image preview box */}
      <div className="border-2 border-dashed p-4 w-80 h-80 flex items-center justify-center bg-white">
        {preview ? (
          <>
            <img
              src={preview}
              alt="uploaded"
              className="w-full h-full object-cover"
            />
            {/* Remove Button */}
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm hover:bg-red-700"
            >
              Clear
            </button>
          </>
        ) : (
          <span className="text-gray-400">Upload an image</span>
        )}
      </div>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        className="mt-4 text-white"
        onChange={handleImageChange}
        ref={fileInputRef} // Attach ref to input
      />
      <br />
      {/* Classify Button */}
      <button
        onClick={handleClassify}
        className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-lg text-lg transition-transform duration-200 hover:from-blue-300 hover:to-blue-600 hover:scale-105 active:scale-95"
      >
        Classify Waste
      </button>
      <br />
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-lg text-lg transition-transform duration-200 hover:from-blue-300 hover:to-blue-600 hover:scale-105 active:scale-95"
      >
        Back
      </button>

      {/* Display Classification Result */}
      {classification && (
        <div className="mt-4 p-4 bg-green-200 text-green-800 rounded-lg text-lg font-semibold">
          Classification: {classification}
          <br></br>
          Confidence: {confidence}
        </div>
      )}
    </div>
  );
}

export default WasteClassifier;