import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Routing
import PrivateRoute from "./components/routing/PrivateRoute";

//Screens
import Landing from "./components/screens/landing_page/Landing";
import LoginScreen from "./components/screens/auth/LoginScreen";
import RegisterScreen from "./components/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/auth/ResetPasswordScreen";
import NotFound from "./components/screens/misc/NotFound";
import HomePage from "./components/screens/HomePage";
import Item from "./components/screens/items/Item";
import PersonnalInformation from "./components/screens/account/PersonnalInformation";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/landing" component={Landing} />
        <PrivateRoute exact path="/item/:itemID" component={Item} />
        <PrivateRoute exact path="/homepage" component={HomePage} />
        <PrivateRoute
          exact
          path="/account/personnalinformation"
          component={PersonnalInformation}
        />

        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
        <Route
          exact
          path="/passwordreset/:resetToken"
          component={ResetPasswordScreen}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
