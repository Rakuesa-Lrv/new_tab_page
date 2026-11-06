import classes from './Navigator.module.css';

import getIconURL from '@/utils/getIco';
import globeIcon from '@/assets/globe.svg';
import plusIcon from '@/assets/plus.svg'
/* 
link[rel~='icon'] 
*/

export interface LinkItem {
  url: string,
  iconUrl: string,
  name: string,
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement>, LinkItem {};

const NavGrid = ({
  url,
  iconUrl,
  name,
}: GridProps)=> {
  return (
    <a
      href={url}
      className={classes.navGrid}
    >

      <div
        className={classes.icon}
      >
        <img 
          src={
            URL.canParse(iconUrl)
            ? iconUrl
            : globeIcon
          } 
          alt={name} />
      </div>
      <p>{name}</p>
      <div
        className={classes.operator}
      >

      </div>
    </a>
  )
}

const linkList: LinkItem[] = [
  {
    url: 'https://nodejs.org/en',
    iconUrl: 'https://nodejs.org/static/images/favicons/favicon.png',
    name: 'Node.js',
  },
  {
    url: 'https://www.tslang.cn/',
    iconUrl: 'https://www.tslang.cn/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
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
]

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  columns: number,
  rows: number,
}
const Navigator = ({
  columns = 6,
  rows = 2,
}: Props)=> {
  return (
    <div
      className={classes.navigator}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {linkList.map((item)=>(
        <NavGrid {...item} />
      ))}
      {linkList.length<columns*rows && 
        <a
          className={classes.navGrid}
        >
          <div
            className={classes.icon}
          >
          <img 
            src={plusIcon} 
            alt='添加快捷方式' />
          </div>
          <p>添加快捷方式</p>
        </a>
      }
    </div>
  )
}

export default Navigator;