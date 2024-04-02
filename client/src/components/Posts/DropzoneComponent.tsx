import "./dropzone.css";

import React, { useEffect } from "react";

import Dropzone from "dropzone";

const DropzoneComponent: React.FC = () => {
  useEffect(() => {
    const dropzone = new Dropzone("#uploadForm", {
      url: "/upload",
      autoProcessQueue: false,
      uploadMultiple: true,
      parallelUploads: 30,
      maxFiles: 30,
      init() {
        // Add uploaded class when files are added
        this.on("addedfile", () => {
          document.querySelector(".dropzone")?.classList.add("uploaded");
        });
        // Remove uploaded class when files are removed
        this.on("removedfile", () => {
          if (this.files.length === 0) {
            document.querySelector(".dropzone")?.classList.remove("uploaded");
          }
        });
      },
    });
    return () => {
      dropzone.removeAllFiles(); // Remove all files when component unmounts
      dropzone.destroy(); // Destroy Dropzone instance
    };
  }, []);

  return (
    <div>
      <form id="uploadForm" className="dropzone">
        <div className="fallback">
          <input name="file" type="file" multiple />
        </div>
      </form>
    </div>
  );
};

export default DropzoneComponent;