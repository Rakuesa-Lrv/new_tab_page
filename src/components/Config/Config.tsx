import classes from './Config.module.css';

import Backdrop from '../Backdrop';
import CloseX from '../common/CloseX';

import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';

import { configItem } from '@/types/config';
import BgConfigItem from './item/BgConfigItem/BgConfigItem';
import { useState } from 'react';

const Config = ()=> {

  const [config, setConfigItem] = useState<typeof configItem[number]['item']>('background');

  const { dispatch } = useStoreField(useDisplayStore, [
    'dispatch',
  ])


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
        <div
          className={classes.configList}
        >
          {configItem.map(({item, name, icon})=> (
            <div
              key={item}
              className={classes.configOption}
              data-selected={config===item}
              onClick={()=> {
                setConfigItem(item);
              }}
            >
              <img src={icon} alt={name} />
              <span>{name}</span>
            </div>
          ))}
        </div>
        {config==='background' && <BgConfigItem className={classes.configItem} />}

      </div>
    </Backdrop>
  )
}

export default Config;