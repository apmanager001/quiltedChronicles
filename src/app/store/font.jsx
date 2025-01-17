import React, { useState } from "react";
import {
  Roboto,
  Lora,
  Merriweather,
  Dancing_Script,
  Lobster,
  Josefin_Sans,
  Nunito_Sans,
  Oswald,
  Poppins,
  Great_Vibes,
} from "next/font/google";

// Define fonts using next/font module
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const lora = Lora({
  subsets: ["latin"],
});
const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
});
const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
});
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
});
const oswald = Oswald({
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

const FontSelector = () => {
  const [selectedFont, setSelectedFont] = useState(roboto.className); // Default to Roboto

  // Handle the change of selected font
  const handleChange = (event) => {
    setSelectedFont(event.target.value); // Set the className of the selected font
  };

  // Define available fonts and their corresponding class names
  const fontStyles = [
    { name: "Roboto", class: roboto.className },
    { name: "Lora", class: lora.className },
    { name: "Merriweather", class: merriweather.className },
    { name: "Dancing Script", class: dancingScript.className },
    { name: "Lobster", class: lobster.className },
    { name: "Josefin Sans", class: josefinSans.className },
    { name: "Nunito Sans", class: nunitoSans.className },
    { name: "Oswald", class: oswald.className },
    { name: "Poppins", class: poppins.className },
    { name: "Great Vibes", class: greatVibes.className },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-60">
      <select
        className="select select-bordered max-w-xs"
        onChange={handleChange}
        name="font"
        value={selectedFont}
      >
        {fontStyles.map((font) => (
          <option key={font.name} value={font.class}>
            {font.name}
          </option>
        ))}
      </select>

      {/* Sample text container with applied font */}
      <div className={`mt-4 ${selectedFont}`}>
        <p className="text-xl text-center">This is a sample text with the selected font.</p>
      </div>
    </div>
  );
};

export default FontSelector;
