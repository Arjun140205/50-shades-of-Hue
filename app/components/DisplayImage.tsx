import ListItem from "./ListItem";
import Hero from "./Hero";
import Image from "next/image";


interface UploadedImageProps {
  uploadedImage: string;
  colorPalette: number[][];
}

function DisplayImage({ uploadedImage, colorPalette }: UploadedImageProps) {
  const toHex = (rgb: string | number): string => {
    const hexValue = typeof rgb === "number" ? rgb.toString(16).padStart(2, "0") : rgb;
    return `${hexValue}`;
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 overflow-x-hidden">
      <div className="w-full flex items-center justify-center">
        {uploadedImage ? (
          <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl h-auto max-h-[30rem] m-4 p-4 flex items-center justify-center border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950 shadow-lg">
            <Image src={uploadedImage} alt="uploaded" width={400} height={400} className="w-full h-full object-cover object-center rounded-xl" />
          </div>
        ) : (
          <Hero />
        )}
      </div>

      {colorPalette && (
        <div className="w-full max-w-6xl px-2 md:px-0">
          <h2 className="text-xl font-black text-white mb-6 tracking-tight">Palette</h2>
          <ul className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            {colorPalette.map((color, index) => {
              const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
              const hex = `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`;
              return <ListItem key={index} rgb={rgb} hex={hex} />;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DisplayImage;
