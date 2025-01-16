import React, { useState } from "react";
import { Geist } from "next/font/google";

const roboto = Geist({
  weight: "400",
  variable: "--font-roboto",
  subsets: ["latin"],
});

const lora = Geist({
  weight: "400",
  variable: "--font-lora",
  subsets: ["latin"],
});

const merriweather = Geist({
  weight: "400",
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const dancingScript = Geist({
  weight: "400",
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const lobster = Geist({
  weight: "400",
  variable: "--font-lobster",
  subsets: ["latin"],
});

const josefinSans = Geist({
  weight: "400",
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const nunitoSans = Geist({
  weight: "400",
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const oswald = Geist({
  weight: "400",
  variable: "--font-oswald",
  subsets: ["latin"],
});

const poppins = Geist({
  weight: "400",
  variable: "--font-poppins",
  subsets: ["latin"],
});

const greatVibes = Geist({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const FontSelector = () => {
  const [selectedFont, setSelectedFont] = useState(roboto.variable);

  const handleChange = (event) => {
    setSelectedFont(event.target.value);
  };

  const fontStyles = [
    { name: "Roboto", class: roboto.variable },
    { name: "Lora", class: lora.variable },
    { name: "Merriweather", class: merriweather.variable },
    { name: "Dancing Script", class: dancingScript.variable },
    { name: "Lobster", class: lobster.variable },
    { name: "Josefin Sans", class: josefinSans.variable },
    { name: "Nunito Sans", class: nunitoSans.variable },
    { name: "Oswald", class: oswald.variable },
    { name: "Poppins", class: poppins.variable },
    { name: "Great Vibes", class: greatVibes.variable },
  ];
// console.log(selectedFont)
  return (
    <div
      className="flex flex-col justify-center items-center gap-2 h-60"
    >
      <select
        className="select select-bordered max-w-xs"
        onChange={handleChange}
        name="font"
        value={selectedFont}
        style={{ fontFamily: selectedFont }}
      >
        {fontStyles.map((font) => (
          <option
            key={font.name}
            value={font.class}
            style={{ fontFamily: font.class }}
          >
            {font.name}
          </option>
        ))}
      </select>

      <div className="mt-4" style={{ fontFamily: `var(${selectedFont})` }}>
        <p className="text-xl">This is a sample text with the selected font.</p>
      </div>
    </div>
  );
};

export default FontSelector;
