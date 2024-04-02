import "./dropzone.css";

import React, { useEffect } from "react";

import Dropzone from "dropzone";

const DropzoneComponent: React.FC = () => {
  useEffect(() => {
    const dropzone = new Dropzone("#uploadForm", {
      url: "http://localhost:3001/upload",
      autoProcessQueue: true,
      uploadMultiple: true,
      parallelUploads: 30,
      maxFiles: 30,
      init() {
        this.on("addedfile", function (file) {
          // Sanitize filename to prevent XSS vulnerabilities
          const sanitizedFileName = sanitizeFileName(file.name);

          // Store sanitized filename in local storage
          localStorage.setItem("uploadedFileName", sanitizedFileName);
        });
      },
    });

    return () => {
      dropzone.removeAllFiles(); // Remove all files when component unmounts
      dropzone.destroy(); // Destroy Dropzone instance
    };
  }, []);

  // Function to sanitize filename to prevent XSS vulnerabilities
  const sanitizeFileName = (fileName: string): string => {
    // Replace any potentially dangerous characters with safe alternatives
    return fileName.replace(/[<>"'&/]/g, "");
  };

  return (
    <div>
      <form id="uploadForm" className="dropzone">
        <div className="fallback">
          {/* Add placeholder attribute to input field */}
          <input
            name="file"
            type="file"
            multiple
            placeholder="Select files to upload"
          />
        </div>
      </form>
    </div>
  );
};

export default DropzoneComponent;
