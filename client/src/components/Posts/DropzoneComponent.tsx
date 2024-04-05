import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import "./post.scss";

const DropzoneComponent = ({ postId }: { postId: string }) => {
  const [notification, setNotification] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const response = await fetch(`http://localhost:3001/upload/${postId}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setNotification("Nuotrauka sėkmingai įkelta!");
        console.log("File uploaded successfully!");
      } else {
        throw new Error(`Upload failed with status ${response.status}`);
      }
    } catch (error) {
      setNotification("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    }

    // Clear the notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, [postId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="dropzone-container p-2">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        <FontAwesomeIcon className="icon" icon={faCloudUploadAlt} size="2x" />
        <p>{isDragActive ? "Paleiskite Failą čia" : "Vilkite čia Failus & Paspauskite"}</p>
      </div>
      <div className="row notification-container justify-content-md-center justify-content-end">
        <div className="col-md-6">
          {notification && (
            <div className="notification alert alert-warning d-flex justify-content-between align-items-center" role="alert" style={{ marginLeft: "-20em",  width: "20em", color: "white" }}>
              <span>{notification}</span>
              <button type="button" className="btn-close" onClick={() => setNotification(null)} aria-label="Close"></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropzoneComponent;
