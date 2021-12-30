import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Routing
import PrivateRoute from "./components/routing/PrivateRoute";

//Screens
import Footer from "./components/screens/Footer";

import Landing from "./components/screens/landing/Landing";
import CartSummary from "./components/screens/cart/CartSummary";
import Checkout from "./components/screens/cart/Checkout";
import OrderConfirmation from "./components/screens/cart/OrderConfirmation";
import LoginScreen from "./components/screens/auth/LoginScreen";
import RegisterScreen from "./components/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/auth/ResetPasswordScreen";
import NotFound from "./components/screens/misc/NotFound";
import HomePage from "./components/screens/HomePage";
import Item from "./components/screens/items/Item";
import PersonnalInformation from "./components/screens/account/PersonnalInformation";
import PreviousOrder from "./components/screens/account/PreviousOrder";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/landing" component={Landing} />
          <PrivateRoute exact path="/cart" component={CartSummary} />
          <PrivateRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute
            exact
            path="/confirmorder/:orderID"
            component={OrderConfirmation}
          />
          <PrivateRoute exact path="/item/:itemID" component={Item} />
          <PrivateRoute exact path="/homepage" component={HomePage} />
          <PrivateRoute
            exact
            path="/account/personnalinformation"
            component={PersonnalInformation}
          />
          <PrivateRoute
            exact
            path="/account/orders"
            component={PreviousOrder}
          />
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
        <Footer />
      </div>
    </Router>
  );
};

export default App;
