import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import FaceCam from "./Page";
import FrontPlate from "./FrontPlate";
import Driver from './Driver'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/webcam/driver/:id?"  component={Driver} />
        <Route exact path="/placa-frente/:id?"  component={FrontPlate} />
        <Route exact path="/webcam/:id?"  component={FaceCam} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
