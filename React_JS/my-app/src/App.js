import logo from './logo.svg';
import './App.css';

let name ="Harry Potter!";
function App() {
  return (
    <>
    <nav>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </nav>
   
    <div className="container">
      <h1>Hello {name}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, nihil atque? Labore eaque praesentium quisquam, minus delectus earum? Modi in similique itaque sint eveniet necessitatibus voluptatibus totam, dolor aut sapiente?</p>
    </div>
    
    </>
  );
}

export default App;
