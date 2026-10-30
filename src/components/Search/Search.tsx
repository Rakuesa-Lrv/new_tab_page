import classes from './Search.module.css';

import Select from './components/Select';
import Input from './components/Input';

const Search = ()=> {

  return (
    <div
      className={classes.search}
    >
      <Select />
      <Input />
    </div>
  )
}

export default Search;