import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type action = 
| 'close'
| 'open'
;

interface State {
  showAdd: boolean,
}

const useDisplayStore = create(immer(combine(
  {
    showAdd: false,
  } as State,
  (set)=> ({
    changeAdd: (action: action)=> {
      set(draft=> {
        switch(action) {
          case "close":
            draft.showAdd&&= false;
            break;
          case "open":
            draft.showAdd||= true;
            break;
        }
      })
    },
  })
)));

export default useDisplayStore;