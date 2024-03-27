import React, { useCallback } from "react";

import { useDropzone } from "react-dropzone";

const DropzoneComponent = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle file upload logic
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default DropzoneComponent;
