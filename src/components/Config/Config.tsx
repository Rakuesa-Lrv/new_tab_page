import classes from './Config.module.css';

import Backdrop from '../Backdrop';
import CloseX from '../common/CloseX';

import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';

import ConfigItemList from './ConfigItemList';
import { configItem } from '@/types/config';
import Background from './item/background';
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
        <ConfigItemList selected={config} />
        {config==='background' && <Background className={classes.configItem} />}

      </div>
    </Backdrop>
  )
}

export default Config;