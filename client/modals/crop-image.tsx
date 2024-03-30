import React, { Dispatch, SetStateAction, useState } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import Modallayout from "./modal-layout";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import styles from "@/styles/crop-image";
import getCroppedImg from "../utils/get-cropped-image";
import { Button } from "@/components/ui/button";
interface Cropimagelayout {
  setOpen: Dispatch<SetStateAction<boolean>>;
  imageUrl: string;
}
const Cropimagelayout = ({ setOpen, imageUrl }: Cropimagelayout) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [preview, setPreview] = useState("");
  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea);
    console.log(croppedAreaPixels);
    const res = await getCroppedImg(imageUrl, croppedAreaPixels);
    setPreview(res.img);
  };
  return (
    <Modallayout setOpen={() => setOpen(false)} z={1001} closeOnClick={true}>
      <div className="rounded-md" style={styles.container}>
        <p className="text-stone-50 text-center" style={styles.header}>
          Crop Profile Pic
        </p>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div style={styles.controls} className="">
          <Slider
            defaultValue={[zoom]}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onValueChange={(value: number[]) => setZoom(value[0])}
            className={cn("w-[100%]")}
          />
          <Button style={styles.footer} variant={"default"}>
            Done
          </Button>
        </div>
      </div>
    </Modallayout>
  );
};

export default Cropimagelayout;
