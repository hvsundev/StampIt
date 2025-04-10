import * as S from "@/features/FileUploader/style.ts";
import Button from "@/components/common/Button/Button.tsx";
import { useRef } from "react";
import { usePDF } from "@/context/usePDFContext";

const StampUploader = () => {
  const { selectedStampImage, setSelectedStampImage, stamps, addStamp } =
    usePDF();
  const stampInputRef = useRef<HTMLInputElement>(null);

  const handleStampUpload = () => {
    stampInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      const uniqueId = `stamp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const newStamp = {
        id: uniqueId,
        image: imageDataUrl,
        x: 0,
        y: 0,
      };

      addStamp(newStamp);
      setSelectedStampImage(imageDataUrl);
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <>
      <S.StampUpload>
        <input
          ref={stampInputRef}
          type="file"
          accept=".png"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button label={"도장 업로드"} onClick={handleStampUpload} />
      </S.StampUpload>

      <S.Stamps>
        {stamps.map((stamp) => (
          <S.StampImage
            key={stamp.id}
            src={stamp.image}
            onClick={() => setSelectedStampImage(stamp.image)}
            isSelected={selectedStampImage === stamp.image}
          />
        ))}
      </S.Stamps>
    </>
  );
};

export default StampUploader;
