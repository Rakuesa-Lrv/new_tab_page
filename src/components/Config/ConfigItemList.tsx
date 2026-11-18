import classes from './ConfigItemList.module.css';

import { configItem } from '@/types/config';

interface Props {
  selected: string,
}

const ConfigItemList = ({
  selected,
}: Props)=> {


  
  return (
    <div
      className={classes.configList}
    >
      {configItem.map(({item, name, icon})=> (
        <div
          key={item}
          className={classes.configItem}
          data-selected={selected===item}
        >
          <img src={icon} alt={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  )
}

export default ConfigItemList;