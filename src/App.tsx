import "./App.css";
import Minesweeper from "./components/minesweeper";

function App() {
  return (
    <>
      <h2>Minesweeper</h2>
      <Minesweeper rows={10} cols={20} mines={40} />
    </>
  );
}

export default App;
