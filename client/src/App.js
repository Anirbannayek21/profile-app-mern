import Home from "./pages/Home"
import './App.css';
import Navber from "./component/Navber";
import { Route, Switch } from "react-router";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Theme from "./style/Theme";
import { ThemeProvider } from "@material-ui/styles"
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import { reducer, initialState } from "./reducer/UseReducer"
import { createContext, useReducer } from "react";

export const userContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={Theme}>
          <Navber />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/logout" component={Logout} />
            <Route component={Error} />
          </Switch>
        </ThemeProvider>
      </userContext.Provider>
    </>
  );
}

export default App;
