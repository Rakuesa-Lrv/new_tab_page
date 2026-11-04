import type { engine } from "@/utils/search";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  engine: engine | undefined,
  query: string,
}



const useSearchStore = create(immer(combine(
  {
    engine: undefined,
    query: '',
  } as State,
  (set)=> ({
    setQuery: (query: string)=> {
      set(draft=> {
        draft.query = query;
      })
    },
    setEngine: (engine: engine)=> {
      set(draft=> {
        draft.engine = engine;
      })
    }
  })
)));

export default useSearchStore;