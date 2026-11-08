import classes from './Select.module.css';

import { Fragment } from 'react/jsx-runtime';

import { Select as Slct } from 'radix-ui';
import { ChevronDownIcon, TriangleLeftIcon } from '@radix-ui/react-icons';

import { engineOptions, type engine } from '@/utils/searchEngine';

import useConfigStore from '@/hooks/useConfigStore';
import useStoreField from '@/hooks/useStoreField';
import useSearchStore from '@/hooks/useSearchStore';


const Select = ()=> {
  const { defaultEngine, setEngine } = useStoreField(useConfigStore, [
    'defaultEngine',
    'setEngine'
  ])

  return (
    <Slct.Root
      value={defaultEngine}
      onValueChange={(value)=> {
        setEngine(value as engine);
      }}
    >
      <Slct.Trigger
        title='切换搜索引擎'
        className={classes.trigger}
      >
        <Slct.Value />
        <Slct.Icon asChild>
          <ChevronDownIcon className={classes.chevronDown} />
        </Slct.Icon>
      </Slct.Trigger>
      <Slct.Portal>
        <Slct.Content
          className={classes.content}
          position='popper'
        >
          {engineOptions.map((item, idx)=> (
            <Fragment key={item.value}>
              { idx>0 && <Slct.Separator className={classes.separate} />}
              <Slct.Item
                className={classes.item}
                value={item.value}
                title={item.label}
              >
                <Slct.ItemText>
                  <p className={classes.itemText}>
                    <img src={item.icon} alt={item.label} className={classes.itemIcon} />
                    <span> {item.label} </span>
                  </p>
                </Slct.ItemText>
                <Slct.ItemIndicator>
                  <TriangleLeftIcon />
                </Slct.ItemIndicator>
              </Slct.Item>
            </Fragment>
          ))}
        </Slct.Content>
      </Slct.Portal>
    </Slct.Root>
  )
}

export default Select;