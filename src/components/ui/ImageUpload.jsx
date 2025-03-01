import React, { useState } from "react";

const ImageUpload = ({ label, name, setValue, errors }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue(name, file);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <label className="font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <div
        className="border border-dashed border-gray-400 p-4 rounded-md flex items-center justify-center cursor-pointer h-60"
        onClick={() => document.getElementById(name).click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <span className="text-gray-500">Click to upload</span>
        )}
      </div>
      <input
        type="file"
        id={name}
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default ImageUpload;
