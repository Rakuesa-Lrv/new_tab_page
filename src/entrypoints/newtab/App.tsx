import Background from "@/components/Background";
import Search from "@/components/Search/Search";
import EditBtn from "@/components/EditBtn";
import Shortcuts from "@/components/Shortcuts/Shortcuts";

const App = ()=> {
  return (
    <Background>
      <Search />
      <Shortcuts />
      <EditBtn />
    </Background>
  )
}

export default App;