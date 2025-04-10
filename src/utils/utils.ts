import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const pdfFileToImages = async (
  file: File,
): Promise<{
  images: string[];
  error: string | null;
  fileName: string;
}> => {
  const pdfUrl = URL.createObjectURL(file);
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

  const totalPages = pdf.numPages;

  const renderPageToImage = async (pageNumber: number): Promise<string> => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 }); // 해상도 조절 가능

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context!, viewport }).promise;

    return canvas.toDataURL("image/png");
  };

  const imagePromises = Array.from({ length: totalPages }, (_, i) =>
    renderPageToImage(i + 1),
  );

  const images = await Promise.all(imagePromises);

  return {
    images,
    error: null,
    fileName: file.name,
  };
};

export const getImagesByFile = async (file: File): Promise<string[]> => {
  const result = await pdfFileToImages(file);
  return result.images;
};

export const pdfFileToImage = async (
  file: File,
): Promise<{
  image: string;
  error: string | null;
  fileName: string;
}> => {
  const pdfUrl = URL.createObjectURL(file);
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

  const renderPageToImage = async (): Promise<string> => {
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context!, viewport }).promise;

    return canvas.toDataURL("image/png");
  };

  return {
    image: await renderPageToImage(),
    error: null,
    fileName: file.name,
  };
};

export const getImageByFile = async (
  file: File,
): Promise<string | undefined> => {
  const result = await pdfFileToImage(file);

  return result.image;
};
