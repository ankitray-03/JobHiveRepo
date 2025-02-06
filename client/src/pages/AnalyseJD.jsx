import { useState } from "react";
import axios from "axios";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";

const JobDescAnalyzer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000); // Reset copied state after 2s
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleGenerate = async (data) => {
    setIsLoading(true);
    // Simulate API call
    try {
      const res = await axios.post("/api/analyze-job/generate-email-resume", {
        jobDescription: data.jobDescription,
        resumeContent: data.resumeContent,
      });

      if (!res.data.success) {
        setError(res.data.message);
        setIsLoading(false);
      } else {
        setResult(res.data);
        setShowResults(true);

        setError(null);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="w-full space-y-6  flex">
        {/* Main Form */}
        <form
          onSubmit={handleSubmit(handleGenerate)}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 space-y-6"
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Job Application Assistant
            </h1>
            <p className="text-gray-600">
              Generate tailored cold emails and optimize your resume for job
              applications!
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste the job description here..."
              {...register("jobDescription", { required: true })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Resume
            </label>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste your resume content here..."
              {...register("resumeContent", { required: true })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Generate Content
              </>
            )}
          </button>
        </form>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6 w-full ml-6">
            {/* Email Template */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generated Cold Email
                {copied ? (
                  <p className="text-sm text-blue-500  ">Copied!</p>
                ) : (
                  <button
                    className="text-sm ml-8 cursor-pointer border-2 p-2 rounded-2xl"
                    onClick={() => copyToClipboard(result.emailContent)}
                  >
                    Copy email!
                  </button>
                )}
              </h2>

              <div>
                <textarea
                  className="w-full h-60 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={result.emailContent}
                />
              </div>
            </div>

            {/* Optimized Resume */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Optimized Resume Content
                {copied ? (
                  <p className="text-sm text-blue-500  ">Copied!</p>
                ) : (
                  <button
                    className="text-sm ml-8 cursor-pointer border-2 p-2 rounded-2xl"
                    onClick={() =>
                      copyToClipboard(result.generatedResumeContent)
                    }
                  >
                    Copy content!
                  </button>
                )}
              </h2>
              <textarea
                className="w-full h-60 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={result.generatedResumeContent}
              />
            </div>
          </div>
        )}

        {/* Error Alert (Demo) */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescAnalyzer;
