import classes from './Input.module.css';

import { searchUrl } from '@/utils/searchEngine';

import useStoreField from '@/hooks/useStoreField';
import useSearchStore from '@/hooks/useSearchStore';
import useConfigStore from '@/hooks/useConfigStore';

const Input = ()=> {

  const { defaultEngine } = useStoreField(useConfigStore, [
    'defaultEngine'
  ]);

  const { query, setQuery } = useStoreField(useSearchStore, [
    'query',
    'setQuery',
  ])

  return (
    <input
      className={classes.input}
      placeholder='搜索'
      value={query}
      onKeyDown={(e)=> {
        const key = e.key;
        key==='Enter' && (()=> {
          const url = searchUrl(defaultEngine, query);
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