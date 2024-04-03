import "./dropzone.css"; // Import custom Dropzone CSS

import React, { useCallback } from "react";

import { useDropzone } from "react-dropzone";

const DropzoneComponent = () => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => { // Explicitly define the type of acceptedFiles
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle success response
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error); // Handle error response
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="dropzone-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive ? "Drop the files here" : "Drag & drop files here"}
        </p>
      </div>
    </div>
  );
};

export default DropzoneComponent;