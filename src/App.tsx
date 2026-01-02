import Main from "./components/Main"
import Sidebar from "./components/Sidebar"

const users = [
  {
    id: "1",
    name: "Caio",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Ana",
    image: "https://i.pravatar.cc/150?img=2",
  },
]

function App() {
  return (
    <div className="flex flex-row size-full">
      <Sidebar users={users} />
      <Main />
    </div>
  )
}

export default App
