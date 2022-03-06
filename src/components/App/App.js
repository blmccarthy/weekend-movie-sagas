import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieForm from '../MovieForm/MovieForm'
import Details from '../Details/Details'
import EditForm from '../EditForm/EditForm'

function App() {
  return (
    <div className="App">
      <header>The Movies Saga!</header>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details">
          <Details />
        </Route>
        <Route path="/form">
          <MovieForm />
        </Route>
        <Route path="/edit">
          <EditForm />
        </Route>
      </Router>
    </div>
  );
}


export default App;
