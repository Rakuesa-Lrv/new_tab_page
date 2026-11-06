import classes from './Search.module.css';

import Select from './components/Select';
import Input from './components/Input';

const Search = ()=> {

  return (
    <div
      className={classes.search}
      style={{
        top: `33vh`,
      }}
    >
      <Input />
      <Select />
    </div>
  )
}

export default Search;