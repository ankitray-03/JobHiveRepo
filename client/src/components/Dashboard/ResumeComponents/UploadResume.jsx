import { useState, useRef } from "react";
import { Upload, X, FileText, Check } from "lucide-react";

const UploadResume = ({ onSubmit }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (!file.type.includes("pdf")) {
      setError("Please upload only PDF files");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("File size must be less than 10MB");
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError("");

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError("");

    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      await onSubmit(file);

      // Clear file after successful submission
      setFile(null);
      setError("");
    } catch (err) {
      setError("Error uploading file. Please try again.");
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  return (
    <div className="w-full mx-[60%] py-[30%] space-y-4">
      <div
        className={`
          relative
          border-2
          border-dashed
          rounded-lg
          p-6
          text-center
          transition-colors
          duration-200
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${error ? "border-red-500" : ""}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleChange}
        />

        {!file ? (
          <div className="space-y-4 ">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-gray-600">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
              >
                Click to upload
              </button>
              {" or drag and drop"}
            </div>
            <p className="text-sm text-gray-500">PDF files only (max. 10MB)</p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                {file.name}
              </span>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!file}
        className={`
          w-full
          py-2
          px-4
          rounded-md
          font-medium
          transition-colors
          duration-200
          ${
            file
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {file ? (
          <div className="flex items-center justify-center space-x-2 cursor-pointer">
            <Check className="h-5 w-5 " />
            <span>Submit PDF</span>
          </div>
        ) : (
          "Upload a PDF to continue"
        )}
      </button>
    </div>
  );
};

export default UploadResume;
