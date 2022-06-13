import "./App.css";
import { Navbar, NavbarBrand } from "reactstrap";
import { render } from "@testing-library/react";
import { Component } from "react";
import Menu from "./components/Menucomponent";
import { DISHES } from "./shared/dish";
import Main from "./components/MainComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
