import React, { Dispatch, SetStateAction, useState } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import Modallayout from "./modal-layout";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import styles from "@/styles/crop-image";
interface Cropimagelayout {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const Cropimagelayout = ({ setOpen }: Cropimagelayout) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };
  return (
    <Modallayout setOpen={() => setOpen(false)} z={1001} closeOnClick={true}>
      <div
        className="border"
        style={{
          minHeight: "400px",
          minWidth: "400px",
          height: "30vw",
          width: "30vw",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          background: "#0c0a09",
        }}
      >
        <p className="text-stone-50 text-center">Crop Profile Pic</p>
        <Cropper
          image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div style={styles.controls} className="">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn("w-[100%]")}
          />
        </div>
      </div>
    </Modallayout>
  );
};

export default Cropimagelayout;
