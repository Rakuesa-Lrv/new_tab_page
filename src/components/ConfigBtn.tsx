import classes from './ConfigBtn.module.css';

import { GearIcon } from '@radix-ui/react-icons'; 
import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';
import Config from './Config';

const ConfigBtn = ()=> {

  const { showConfig, dispatch } = useStoreField(useDisplayStore, [
    'showConfig',
    'dispatch'
  ])

  return (
    <>
      {showConfig && <Config />}
      <div 
        className={classes.edit}
        onClick={()=> {
          dispatch({ display: 'open', act: 'config' })
        }}
        >
        <GearIcon />
        <span>设置</span>
      </div>
    </>
  )
}

export default ConfigBtn;