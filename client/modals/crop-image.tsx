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
  setImageCropUrl: Dispatch<SetStateAction<string>>;
  imageUrl: string;
}
const Cropimagelayout = ({
  setOpen,
  imageUrl,
  setImageCropUrl,
}: Cropimagelayout) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    const res = await getCroppedImg(imageUrl, croppedAreaPixels);
    if (res) {
      setImageCropUrl(res);
    }
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
          aspect={4 / 3}
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
          <Button
            style={styles.footer}
            variant={"default"}
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </div>
    </Modallayout>
  );
};

export default Cropimagelayout;
