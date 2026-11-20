import type { Area } from "react-easy-crop";

const getCropped = (
  imgSrc: string,
  cropArea: Area,
)=> {
  return new Promise<Blob>((res,rej)=> {
    const img = new Image();
    img.src = imgSrc;
    img.crossOrigin = 'anonymous';
    const { x, y, width, height } = cropArea;
    img.onload = ()=> {
      const cvs = document.createElement('canvas');
      cvs.width = width;
      cvs.height = height;
      const ctx = cvs.getContext('2d');
      ctx?.drawImage(
        img,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height,
      );
      cvs.toBlob((blob)=> (blob? res(blob): rej(new Error('toBlob failed'))));
    };
    img.onerror = rej;
  })
}

export default getCropped;