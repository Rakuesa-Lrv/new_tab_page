import classes from './Config.module.css';

import Backdrop from './Backdrop';
import CloseX from './common/CloseX';

import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';
import { useEffect, useState } from 'react';
import { getAllBg, addBg, type Bg } from '@/utils/db';
import useConfigStore from '@/hooks/useConfigStore';
import { UploadIcon } from '@radix-ui/react-icons';

const Config = ()=> {

  const [err, setErr] = useState('');
  
  const { setBackground } = useStoreField(useConfigStore, [
    'setBackground'
  ])

  const { dispatch } = useStoreField(useDisplayStore, [
    'dispatch'
  ])
  const [bgList, setBgList] = useState<Bg[]>([]);
  const fetchBgList = async ()=> {
    const list = await getAllBg();
    setBgList(list);
  }
  const handleAdd = async (file: File)=> {
    const key = await addBg(file);
    await fetchBgList();
    setBackground(key);
  }

  useEffect(()=> {
    fetchBgList();
  },[])

  return (
    <Backdrop>
      <div
        className={classes.config}
      >
        <CloseX 
          onClick={()=> {
            dispatch({ act: 'config', display: 'close' })
          }}
        />
        <label
          className={classes.upload}
        >
          <span>自定义背景:</span>
          <div
            className={classes.uploadIcon}
          >
            <UploadIcon />
          </div>
          <input 
            type='file' 
            name='background' 
            className='sr-only'
            accept='image/png, image/jpeg, image/bmp' 
            onChange={(e)=> {
              const curr = e.currentTarget;
              const file = curr.files?.[0];
              if(!file) {
                setErr('获取图像失败');
                return;
              };
              handleAdd(file);
            }}
          />
        </label>

        <div
          className={classes.bgGrid}
        >{
          bgList.map(item=> (
            <div
              className={classes.bgDisplay}
              key={item.id}
              onClick={()=> {
                setBackground(item.id);
              }}
            >
              <img 
                className={classes.tempImg}
                src={URL.createObjectURL(item.blob)} 
                alt={item.name}
              />
              <span>{item.name}</span>
            </div>
          ))
        }</div>

      </div>
    </Backdrop>
  )
}

export default Config;