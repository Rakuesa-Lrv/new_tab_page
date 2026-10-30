import classes from './Select.module.css';

import { Fragment } from 'react/jsx-runtime';

import { Select as Slct } from 'radix-ui';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';

import { engineOptions, type engine } from '@/utils/search';

import useConfigStore from '@/hooks/useConfigStore';
import useStoreField from '@/hooks/useStoreField';
import useSearchStore from '@/hooks/useSearchStore';


const Select = ()=> {
  const { defaultSearchEngine: defEngine } = useStoreField(useConfigStore, [
    'defaultSearchEngine'
  ])

  const { engine, setEngine } = useStoreField(useSearchStore, [
    'engine', 
    'setEngine'
  ])

  return (
    <Slct.Root
      value={engine ?? defEngine}
      onValueChange={(value)=> {
        setEngine(value as engine)
      }}
    >
      <Slct.Trigger
        className={classes.trigger}
      >
        <Slct.Value />
        <Slct.Icon asChild>
          <ChevronDownIcon />
        </Slct.Icon>
      </Slct.Trigger>
      <Slct.Portal>
        <Slct.Content
          className={classes.content}
          position='popper'
        >
          {engineOptions.map((item, idx)=> (
            <Fragment key={item.value}>
              { <Slct.Separator className={classes.separate} />}
              <Slct.Item
                className={classes.item}
                value={item.value}
              >
                <Slct.ItemText>
                  <p className={classes.itemText}>
                    <img src={item.icon} alt={item.label} />
                    <span> {item.label} </span>
                  </p>
                </Slct.ItemText>
                <Slct.ItemIndicator asChild>
                  <CheckIcon />
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