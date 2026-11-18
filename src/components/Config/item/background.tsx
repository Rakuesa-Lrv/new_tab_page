import classes from './Background.module.css';

import useStoreField from '@/hooks/useStoreField';
import { UploadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { getAllBg, addBg, type Bg } from '@/utils/db';
import useConfigStore from '@/hooks/useConfigStore';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Background = ({
  className
}:Props)=> {
  const [err, setErr] = useState('');
  
  const { background, setBackground } = useStoreField(useConfigStore, [
    'background',
    'setBackground',
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
    <div
      className={`${classes.bgConfig} ${className}`}
    >
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
            data-selected={item.id===background}
            onClick={()=> {
              setBackground(item.id);
            }}
          >
            <div
              className={classes.bgContain}
            >
              <img 
                className={classes.bgImg}
                src={URL.createObjectURL(item.blob)} 
                alt={item.name}
              />
            </div>
            <span>{item.name}</span>
          </div>
        ))
      }</div>
    </div>
  )
}

export default Background;