import Background from "@/components/Background";
import Search from "@/components/Search/Search";
import ConfigBtn from "@/components/ConfigBtn";
import Shortcuts from "@/components/Shortcuts/Shortcuts";

const App = ()=> {
  return (
    <Background>
      <Search />
      <Shortcuts />
      <ConfigBtn />
    </Background>
  )
}

export default App;