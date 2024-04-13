import "./assets/post.scss";

import Dropzone, { DropzoneOptions } from "dropzone";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

const DropzoneComponent: React.FC<{ postId: string }> = ({ postId }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [uploadedCount, setUploadedCount] = useState<number>(0); // State to track uploaded count

  useEffect(() => {
    const dropzoneOptions: DropzoneOptions = {
      url: `http://localhost:3001/upload/${postId}`,
      acceptedFiles: "image/*",
      dictDefaultMessage: "Vilkite čia Failus & Paspauskite",
      maxFiles: 10,
    };

    const dropzone = new Dropzone("#uploadForm", dropzoneOptions);

    dropzone.on("error", (file, errorMessage) => {
      console.error("Error uploading file:", errorMessage);

      if (errorMessage instanceof Error) {
        setErrorMessage(errorMessage.message);
      } else {
        setErrorMessage(errorMessage);
      }
    });

    dropzone.on("maxfilesexceeded", () => {
      setErrorMessage("Maksimalus viršytų failų skaičius.");
    });

    dropzone.on("maxfilesreached", () => {
      setErrorMessage(null);
    });

    dropzone.on("success", (file) => {
      setFileUploaded(true);
      setUploadedCount((prevCount) => prevCount + 1); // Increment uploaded count
      setNotification("Sėkmingai įkelta!");
    });

    return () => {
      dropzone.destroy();
    };
  }, [postId]);

  return (
    <div className="dropzone-container p-2">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {notification && (
        <div className="notification">
          {notification}{" "}
          {uploadedCount > 0 &&
            `(Įkelta: ${uploadedCount} ${
              uploadedCount === 1 ? "nuotrauka" : "nuotraukos"
            })`}
        </div>
      )}
      <form id="uploadForm" className="dropzone">
        <div className="fallback">
          <input
            name="file"
            type="file"
            multiple
            placeholder="Pasirinkite failus, kuriuos norite įkelti"
          />
        </div>
        {!fileUploaded && (
          <div className="upload-icon">
            <FontAwesomeIcon icon={faFileUpload} />
          </div>
        )}
      </form>
    </div>
  );
};

export default DropzoneComponent;
