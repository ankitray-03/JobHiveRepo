import { useState } from "react";
import UploadResume from "../components/Dashboard/ResumeComponents/UploadResume";
import axios from "axios";
import LoadingUI from "../components/LoadeingComponent.jsx/LoadingUI";
import { useNavigate } from "react-router";

const ResumeUploadPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (file) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file); // "resume" should match the field name expected in the backend

      const res = await axios.post("/api/fileUplaod/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsUploading(false);
      console.log(res);
      navigate("/dashboard/viewResume");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isUploading ? (
        <div>
          <LoadingUI />
          <p className="text-3xl m-[30%]">Uploading...</p>
        </div>
      ) : (
        <UploadResume onSubmit={onSubmit} />
      )}
    </>
  );
};

export default ResumeUploadPage;
