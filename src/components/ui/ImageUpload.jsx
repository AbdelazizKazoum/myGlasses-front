import React, { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/getImageUrl";

const ImageUpload = ({ label, name, setValue, errors, defaultImage }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(file);
      setValue(name, file);
    }
  };

  useEffect(() => {
    setPreview(defaultImage);
    setValue(name, defaultImage);
  }, [defaultImage, name, setValue]);

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
          <div className="flex h-full w-full">
            <img
              src={
                preview instanceof File
                  ? URL.createObjectURL(preview)
                  : getImageUrl(preview)
              }
              alt="Preview"
              className=" w-full h-full object-contain rounded-md"
            />
          </div>
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
