import baiduIcon from '@/assets/baidu-color.svg';
import bingIcon from '@/assets/bing-color.svg';
import google from '@/assets/google-color.svg';

const engineC = ['baidu', 'Microsoft Bing', 'Google'] as const;
export type engine = typeof engineC[number]

interface engineInfo {
  label: string,
  icon: string,
  baseUrl: string,
}

const engineMap = {
  'baidu': {
    label: '百度',
    icon: baiduIcon,
    baseUrl: 'https://www.baidu.com/s?ie=utf-8&wd=${query}',
  },
  'Microsoft Bing': {
    label: '必应',
    icon: bingIcon,
    baseUrl: 'https://www.bing.com/search?q=${query}',
  },
  'Google': {
    label: '谷歌',
    icon: google,
    baseUrl: 'https://www.google.com/search?q=${query}',
  },
} as Record<engine, engineInfo>

export const engineOptions = (Object.keys(engineMap) as engine[] ).map((value)=> ({
  value,
  label: engineMap[value].label,
  icon: engineMap[value].icon,
}))

export const searchUrl = (
  engine: engine,
  query: string,
)=> (engineMap[engine].baseUrl.replace('${query}', encodeURIComponent(query)));