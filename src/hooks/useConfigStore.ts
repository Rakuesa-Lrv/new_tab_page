import type { engine } from "@/utils/search";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  defaultSearchEngine: engine,

}

const useConfigStore = create(persist(immer(combine(
  {
    defaultSearchEngine: 'Google',
  } as State,
  (set)=> ({
    setEngine: (engine: engine)=> {
      set(draft=> {
        draft.defaultSearchEngine = engine;
      })
    },
  })
)), { name: 'config' }));

export default useConfigStore;