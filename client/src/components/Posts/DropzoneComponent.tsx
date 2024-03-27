import React, { useCallback } from "react";

import Dropzone from "dropzone";
import { useDropzone } from "react-dropzone";

const DropzoneComponent: React.FC = () => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="card" style={cardStyle}>
      <div className="card-body" {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  maxWidth: "400px", // Adjust as needed
  margin: "0 auto", // Center the card horizontally
};

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default DropzoneComponent;
