import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Routing
import PrivateRoute from "./components/routing/PrivateRoute";

//Screens
import PrivateScreen from "./components/screens/auth/PrivateScreen";
import LoginScreen from "./components/screens/auth/LoginScreen";
import RegisterScreen from "./components/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/auth/ResetPasswordScreen";
import NotFound from "./components/screens/misc/NotFound";
import HomePage from "./components/screens/HomePage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <PrivateRoute exact path="/homepage" component={HomePage} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
