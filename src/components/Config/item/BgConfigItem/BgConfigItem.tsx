import classes from './BgConfigItem.module.css';

import useStoreField from '@/hooks/useStoreField';
// import { UploadIcon } from '@radix-ui/react-icons';
import uploadIcon from '@/assets/upload.svg';

import { useEffect, useState } from 'react';
import { getAllBg, addBg, type Bg } from '@/utils/db';
import useConfigStore from '@/hooks/useConfigStore';
import useDisplayStore from '@/hooks/useDisplayStore';
import BgCrop from './BgCrop';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const BgConfigItem = ({
  className
}:Props)=> {
  const [err, setErr] = useState('');

  const { cropImg, showCrop, dispatch } = useStoreField(useDisplayStore, [
    'cropImg',
    'showCrop',
    'dispatch'
  ])
  
  const { background, setBackground } = useStoreField(useConfigStore, [
    'background',
    'setBackground',
  ])

  const [bgList, setBgList] = useState<Bg[]>([]);
  const fetchBgList = async ()=> {
    const list = await getAllBg();
    setBgList(list);
  }
  
  const [cropC, setCropC] = useState(false);

  useEffect(()=> {
    fetchBgList();
  },[cropC])

  return (
    <>
      {showCrop && <BgCrop setCropC={setCropC} />}
      <div
        className={`${classes.bgConfig} ${className}`}
      >
        
        <div
          className={classes.current}
        >
          <p>背景图像编辑</p>
          <div className={classes.separator} ></div>
          <p>历史背景</p>
        </div>

        <div
          className={classes.bgGrid}
        >
          <label>
            <div
              className={`${classes.bgDisplay} ${classes.uploadDisplay}`}
            >
              <div
                className={classes.bgContain}
              >
                <img 
                  className={classes.bgImg}
                  src={uploadIcon} 
                />
              </div>
              <span>
                上传自定义背景
              </span>
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
                dispatch({ act: 'crop', display: 'open', cropImg: { url: URL.createObjectURL(file), name: file.name  }});
              }}
            />
          </label>
          {bgList.map(item=> (
            <div
              className={classes.bgDisplay}
              key={item.id}
              data-selected={item.id===background}
              onClick={()=> {
                setBackground(item.id);
                // URL.revokeObjectURL(background);
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
          ))}
        </div>
      </div>
    </>

  )
}

export default BgConfigItem;