import Resizer from "react-image-file-resizer";
export const resizeFile = (file: File, size = 450) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      size,
      size,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
