import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Dialog } from "@headlessui/react";
import { CheckCircle } from "lucide-react";

const ColorPickerField = ({ label, name, setValue, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <div
        className="flex items-center gap-2 border p-2 rounded cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Color Preview Circle */}
        <div
          className="w-6 h-6 rounded-full border"
          style={{ backgroundColor: selectedColor }}
        ></div>
        {/* Color Code Display */}
        <span className="text-gray-700">{selectedColor}</span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Color Picker Dialog */}
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Pick a Color</h2>
            <div className="w-full flex justify-center items-center">
              <HexColorPicker
                color={selectedColor}
                onChange={setSelectedColor}
              />
            </div>
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
