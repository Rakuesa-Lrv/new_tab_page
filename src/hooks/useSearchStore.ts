import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  query: string,
}

const useSearchStore = create(immer(combine(
  {
    query: '',
  } as State,
  (set)=> ({
    setQuery: (query: string)=> {
      set(draft=> {
        draft.query = query;
      })
    },
  })
)));

export default useSearchStore;