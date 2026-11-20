import classes from './BgCrop.module.css';
import Backdrop from '@/components/Backdrop';

import defImg from '@/assets/1728455643607.jpg'
import CloseX from '@/components/common/CloseX';
import { useState, type Dispatch, type SetStateAction } from 'react';

import Cropper, { type Area } from 'react-easy-crop';
import { addBg } from '@/utils/db';
import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';
import getCropped from '@/utils/getCropped';
import useConfigStore from '@/hooks/useConfigStore';

interface Props {
  setCropC: Dispatch<SetStateAction<boolean>>,
}

const BgCrop = ({
  setCropC,
}: Props)=> {

  const { cropImg, showCrop, dispatch } = useStoreField(useDisplayStore, [
    'cropImg',
    'showCrop',
    'dispatch'
  ])

  const { setBackground } = useStoreField(useConfigStore, [
    'setBackground',
  ])

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area|null>(null);

  const handleCrop = async ()=> {
    if(!croppedAreaPixels) return;
    try {
      const blob = await getCropped(cropImg.url, croppedAreaPixels);
      const file = new File([blob], cropImg.name)
      const key = await addBg(file);
      dispatch({ act: 'crop', display: 'close' })
      setCropC(true);
      setBackground(key);
    }catch {
      console.error('crop error');
    }
  }

  return (
    <Backdrop>

      <div
        className={classes.cropContainer}
      >
        <Cropper
          image={cropImg.url}
          crop={crop}
          zoom={zoom}
          aspect={16/9}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels);
          }}
        />
        <button
          className={classes.cropBtn}
          onClick={handleCrop}
        >
          裁剪
        </button>

        <CloseX 
          className={classes.cropClose}
          onClick={()=> {
            dispatch({ act: 'crop', display: 'close' })
            URL.revokeObjectURL(cropImg.url);
          }}
        />
      </div>
    </Backdrop>

  )
}

export default BgCrop;