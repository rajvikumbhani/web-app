import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Cards  from './Components/Cards';
// import CardsName from './Components/CardsName'; 

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <Home />
        <Cards />
        {/* <CardsName/> */}
      </>
    </div>
  );
}

export default App;
