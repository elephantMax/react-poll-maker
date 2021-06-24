import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import { Switch, Route } from 'react-router-dom'
import Discover from "./components/Discover";
import PollDetails from "./components/PollDetils";
import Results from "./components/Results";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Main}></Route>
          <Route path="/create" component={Create}></Route>
          <Route path="/discover" component={Discover}></Route>
          <Route path="/poll/:id" component={PollDetails}></Route>
          <Route path="/results" component={Results}></Route>
          <Route path="*">
              <p style={{color:"white"}}>Not found</p>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
