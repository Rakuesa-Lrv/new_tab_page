import Background from "@/components/Background";
import Search from "@/components/Search/Search";
import EditBtn from "@/components/EditBtn";
import Navigator from "@/components/Navigator/Navigator";

const App = ()=> {
  return (
    <Background>
      <Search />
      <Navigator />
      <EditBtn />
    </Background>
  )
}

export default App;