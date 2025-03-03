import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Dialog } from "@headlessui/react";
import { CheckCircle } from "lucide-react";

const famousColors = {
  Red: "#FF0000",
  Green: "#008000",
  Blue: "#0000FF",
  Yellow: "#FFFF00",
  Orange: "#FFA500",
  Purple: "#800080",
  Black: "#000000",
  White: "#FFFFFF",
};

const ColorPickerField = ({ label, name, setValue, error, watch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [colorInput, setColorInput] = useState("#000000");

  const watchedColor = watch(name);

  useEffect(() => {
    if (watchedColor) {
      setSelectedColor(watchedColor);
      setColorInput(watchedColor);
    }
  }, [watchedColor]);

  const handleInputChange = (e) => {
    const color = e.target.value;
    setColorInput(color);
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      setSelectedColor(color);
    }
  };

  const handleSelectChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    setColorInput(color);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setColorInput(color);
  };

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <div
        className="flex items-center gap-2 border p-2 rounded cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="w-6 h-6 rounded-full border"
          style={{ backgroundColor: selectedColor }}
        ></div>
        <span className="text-gray-700">{selectedColor}</span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Pick a Color</h2>
            <div className=" w-full flex justify-center">
              <HexColorPicker
                color={selectedColor}
                onChange={handleColorChange}
              />
            </div>

            <input
              type="text"
              className="mt-3 w-full p-2 border rounded text-center"
              value={colorInput}
              onChange={handleInputChange}
            />

            <select
              className="mt-3 w-full p-2 border rounded bg-white "
              onChange={handleSelectChange}
              value={selectedColor}
            >
              <option className="" value="">
                Select a color
              </option>
              {Object.entries(famousColors).map(([name, hex]) => (
                <option className="" key={hex} value={hex}>
                  {name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setValue(name, selectedColor);
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded flex items-center gap-1"
              >
                <CheckCircle size={18} />
                Select
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ColorPickerField;
