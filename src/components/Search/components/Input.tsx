import classes from './Input.module.css';

import { searchUrl } from '@/utils/searchEngine';

import useStoreField from '@/hooks/useStoreField';
import useSearchStore from '@/hooks/useSearchStore';
import useConfigStore from '@/hooks/useConfigStore';

const Input = ()=> {

  const { defaultSearchEngine: defEngine } = useStoreField(useConfigStore, ['defaultSearchEngine']);

  const { engine, query, setQuery } = useStoreField(useSearchStore, [
    'engine',
    'query',
    'setQuery',
  ])

  return (
    <input
      className={classes.input}
      placeholder='搜索'
      onKeyDown={(e)=> {
        const key = e.key;
        key==='Enter' && (()=> {
          const url = searchUrl(engine ?? defEngine, query);
          location.href = url;
        })();
      }}
      onChange={(e)=> {
        setQuery(e.currentTarget.value);
      }}
    >
    </input>
  )
}

export default Input;