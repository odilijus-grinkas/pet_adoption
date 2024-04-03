import React, { useCallback } from 'react';
import Dropzone from 'react-dropzone';

const DropzoneComponent = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('photo', file); // Change 'file' to 'photo'

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle success response
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error); // Handle error response
    }
  }, []);

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '1px dashed black', padding: '20px' }}>
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default DropzoneComponent;
