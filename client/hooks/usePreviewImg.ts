import { imgurl } from "@/modals/thread-modal";

const usePreviewImg = ({
  setImgUrl,
}: {
  setImgUrl: React.Dispatch<React.SetStateAction<imgurl[]>>;
}) => {
  const handleImageChange = ({ id, e }: handleImageChange) => {
    const files = e.target?.files;
    if (files) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader?.result) {
            const res = reader?.result as string;
            setImgUrl((prev) => [
              ...prev,
              {
                id: id,
                data: res,
              },
            ]);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setImgUrl([]);
    }
  };
  return { handleImageChange };
};
interface handleImageChange {
  id: number;
  e: React.ChangeEvent<HTMLInputElement>;
}
export default usePreviewImg;
