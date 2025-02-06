import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// set the worker for renndering pdfs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const ViewResume = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [numPages, setNumPages] = useState({});
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(`/api/resume/getResume/${currentUser._id}`);

        if (res.status === 200) {
          setResumes(res.data);
          setIsLoading(false);
        } else {
          console.log(res);
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    fetchResume();
  }, []);

  const onDocumentLoadSuccess = (fileIndex, pages) => {
    setNumPages((prevState) => ({ ...prevState, [fileIndex]: pages }));
  };

  const downloadPdf = (e, pdfUrl, index) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation();

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `Resume${index}.pdf`;
    link.target = "_blank"; // Open in a new tab
    link.rel = "noopener noreferrer";
    link.click();
  };

  const handleDelete = async (e, resume) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axios.delete(
      `/api/resume/deleteResume/${resume._id}/`
    );

    if (response.status === 200) {
      setResumes((prev) =>
        prev.filter((tempResume) => resume._id !== tempResume._id)
      );

      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log(response);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="mx-[40vh] my-[20vh]">
          <ClimbingBoxLoader
            color={"#1883BF"}
            loading={isLoading}
            size={35}
            speedMultiplier={1.5}
          />
          <p className="text-2xl font-bold mt-10">Loading Resumes...</p>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-semibold">My Resumes 🗃️</h1>
          <div className="flex-row flex-wrap mx-auto ">
            {resumes.map((resume, index) => (
              <div key={index} className="m-4 float-left cursor-pointer">
                <div>
                  <Document
                    className="p-8 bg-slate-100"
                    file={resume.resumeUrl}
                    onLoadSuccess={(pages) =>
                      onDocumentLoadSuccess(index, pages)
                    }
                    loading="Loading PDF..."
                  >
                    <Page
                      pageNumber={1}
                      height={450}
                      scale={1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                  <button
                    onClick={(e) => downloadPdf(e, resume.resumeUrl, index)}
                    style={{
                      marginTop: "20px",
                      padding: "10px 20px",
                      background: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    className="cursor-pointer"
                  >
                    View / Downlaod
                  </button>
                  <button
                    className="bg-red-500 p-2 m-6 rounded text-slate-100 cursor-pointer"
                    onClick={(e) => handleDelete(e, resume)}
                  >
                    Delete Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewResume;
