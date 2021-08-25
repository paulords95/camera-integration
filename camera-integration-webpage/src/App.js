import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import FaceCam from "./Page";
import FrontPlate from "./FrontPlate";
import Driver from "./Driver";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/webcam/driver/:id?/:plate?" component={Driver} />
        <Route exact path="/placa-frente/:id?/:plate?" component={FrontPlate} />
        <Route exact path="/webcam/:id?/:plate?" component={FaceCam} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
