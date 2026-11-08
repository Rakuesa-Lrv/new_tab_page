import classes from './AddForm.module.css';

import crossIcon from '@/assets/cross.svg'

import Backdrop from '@/components/Backdrop';

import useDisplayStore from '@/hooks/useDisplayStore';
import useStoreField from '@/hooks/useStoreField';
import ShortcutItem from './ShortcutItem';
import getIconURL from '@/utils/getIco';
import type { Shortcut } from '@/hooks/useConfigStore';

import { useImmer } from 'use-immer';
import useConfigStore from '@/hooks/useConfigStore';

interface Input extends Omit<Shortcut, 'id'> {
  isCustomIcon: boolean,
};

const AddForm = ()=> {
  const { showAdd, changeAdd } = useStoreField(useDisplayStore, [
    'showAdd',
    'changeAdd',
  ])

  const { changeShortcut } = useStoreField(useConfigStore, [
    'changeShortcut'
  ])

  const [input, updateInput] = useImmer<Input>({
    name: '',
    url: '',
    iconUrl: '',
    isCustomIcon: false,
  })

  return (
    <Backdrop
      onClose={()=> {
        changeAdd('close');
      }}
    >
      <div
        className={classes.add}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"xmlns="http://www.w3.org/2000/svg"
          className={classes.closeIcon}
          onClick={()=> {
            changeAdd('close');
          }}
        >
          <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
        <div
          className={classes.addForm}
        >
          <p
            className={classes.legend}
          >
            添加快捷方式
          </p>
          <form
            onSubmit={(e)=> {
              e.preventDefault();
              changeShortcut({ type: 'PUSH', shortcut: input })
              changeAdd('close');
            }}
            className={classes.form}
          >
            <label>
              <span>名称:</span>
              <input 
                type='text'
                name='name'
                placeholder='请输入名称(为空则自动获取网页标题)'
                value={input.name}
                onChange={(e)=> {
                  const name = e.currentTarget.value;
                  updateInput(draft=> {draft.name= name});
                }}
              />
            </label>
            <label>
              <span>网址:</span>
              <input 
                type='text'
                name='url'
                placeholder='请输入网址'
                value={input.url}
                onChange={(e)=>{
                  const url = e.currentTarget.value;
                  updateInput(draft=> {draft.url = url});
                  updateInput(draft=> {draft.iconUrl = getIconURL(url)?.some || " " });
                }}
              />
            </label>
            <label>
              <span>
                自定义图标
              </span>
              <input 
                type='checkbox' 
                name='isCustomIcon'
                onChange={(e)=> {
                  const checked = e.currentTarget.checked;
                  updateInput(draft=> {draft.isCustomIcon = checked});
                }}
              />
            </label>
            {input.isCustomIcon && (
              <label>
                <span>图标</span>
                <input 
                  type='text'
                  name='icon'
                  placeholder='请输入图标连接'
                  value={input.iconUrl}
                  onChange={(e)=>{
                    const iconUrl = e.currentTarget.value;
                    updateInput(draft=> {draft.iconUrl = iconUrl});
                  }}
                />
              </label>
            )}
            <div
              className={classes.btnList}
            >
              <button type='submit'>
                添加
              </button>
              <button 
                type='button'
                onClick={()=> {
                  changeAdd('close');
                }}
              >
                取消
              </button>
            </div>
          </form>
        </div>
        <div
          className={classes.display}
        >
          <ShortcutItem
            name={input.name}
            url={input.url}
            iconUrl={input.iconUrl}
          />
          <span>
            样例
          </span>
        </div>
      </div>
    </Backdrop>
  )
}

export default AddForm;