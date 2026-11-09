import classes from './Shortcuts.module.css';

import plusIcon from '@/assets/plus.svg'

import useConfigStore, { type Shortcut } from '@/hooks/useConfigStore';
import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';

import AddForm from './components/AddForm';
import UpdateForm from './components/UpdateForm';
import ShortcutItem from './components/ShortcutItem';
import DeleteForm from './components/DeleteForm';

const linkList = [
  {
    url: 'https://nodejs.org/en',
    iconUrl: 'https://nodejs.org/static/images/favicons/favicon.png',
    name: 'Node.js',
  },
  {
    url: 'https://www.typescriptlang.org/',
    iconUrl: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
    name: 'TypeScript',
  },
  {
    url: 'https://www.mongodb.com/zh-cn',
    iconUrl: 'https://www.mongodb.com/zh-cn/assets/images/global/favicon.ico',
    name: 'MongoDB',
  },
  {
    url: 'https://v2.tauri.app/zh-cn/',
    iconUrl: 'https://v2.tauri.app/favicon.svg',
    name: 'Tauri 2.0',
  },
  {
    url: 'https://spdx.org/licenses/',
    iconUrl: 'https://spdx.org/licenses/sites/all/themes/cpstandard/favicon.ico',
    name: 'SPDX',
  },
  {
    url: 'https://semver.org/lang/zh-CN/',
    iconUrl: 'https://semver.org/assets/500x500(light).jpg',
    name: '语义化版本',
  },
  {
    url: 'https://zh-hans.react.dev/learn',
    iconUrl: 'https://zh-hans.react.dev/favicon-32x32.png',
    name: 'React',
  },
  {
    url: 'https://zustand.site/zh/',
    iconUrl: '🐻',
    name: 'Zustand',
  },
  {
    url: 'https://docs.emmet.com.cn/',
    iconUrl: 'https://docs.emmet.com.cn/-/3755353140/favicon.ico',
    name: 'Emmet',
  },
  {
    url: 'https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references',
    iconUrl: 'https://resources.whatwg.org/logo.svg',
    name: 'HTML Standard',
  },
  {
    url: 'https://developer.mozilla.org/zh-CN/',
    iconUrl: 'https://developer.mozilla.org/favicon.ico',
    name: 'MDN - 开发者的资源 由开发者打造',
  },
] as Shortcut[];
;(()=> {
  linkList.forEach(item=> {
    item.id = item.url.split('://')[1] ?? crypto.randomUUID();
  })
})();

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number,
  rows?: number,
}
const Shortcuts = ({
  columns = 6,
  rows = 2,
}: Props)=> {
  const { showAdd, showUpdate, showDelete } = useStoreField(useDisplayStore, [
    'showAdd',
    'showUpdate',
    'showDelete',
  ])

  const { shortCutList } = useStoreField(useConfigStore, [
    'shortCutList',
  ])

  return (
    <>

    { showAdd && <AddForm /> }
    { showUpdate && <UpdateForm /> }
    { showDelete && <DeleteForm /> }

    <div
      className={classes.shortcuts}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {shortCutList.map((item,idx)=>(
        <ShortcutItem {...item} key={item.id} tar={item.id} isReversed={idx===0}/>
      ))}
      {linkList.length<columns*rows && (
        <ShortcutItem 
          tar='_ZN_add_shortcut'
          isAdd
          url='' 
          iconUrl={plusIcon} 
          name='添加快捷方式'
        />
      )}
    </div>

    </>
  )
}

export default Shortcuts;