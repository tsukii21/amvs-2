import Home from "./components/Home"
import { DataContextWrapper } from "./contexts/data"

const App = () => {
  return (
    <div className="bg-black w-screen overflow-hidden h-screen text-white">
      <DataContextWrapper>
        <Home />
      </DataContextWrapper>
    </div>
  )
}

export default App
