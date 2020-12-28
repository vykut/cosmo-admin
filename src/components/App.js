import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import LoginLogic from "./LoginComponents/LoginLogic";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./HeaderComponents/Header";
import { pages } from "../utils/utils";
import PageContainer from "./AuxiliaryComponents/PageContainer";
import OrderDetails, { OrderDetailsWithRouter } from "./OrdersComponents/OrderDetails/OrderDetails";

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) {
    return <></>;
  }
  return children
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
function PrivateRoute({ children, ...rest }) {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isEmpty(auth) ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function App() {
  return (
    <>
      <AuthIsLoaded>
        <Router>
          <Header />
          <Switch>
            {/* <PrivateRoute path='/acasa'> */}
            {/* <Home /> */}
            {/* <Redirect to='/comenzi' /> */}
            {/* </PrivateRoute> */}
            <Route path='/login'>
              <LoginLogic />
            </Route>
            <PrivateRoute path='/comenzi/:orderID/detalii'>
              <PageContainer title='Detalii comandă' showBack={true} >
                <OrderDetailsWithRouter />
              </PageContainer>
            </PrivateRoute>
            {pages.map((page, index) => {
              return <PrivateRoute path={page.path} key={page.name}>
                <PageContainer title={page.name}>
                  {page.component()}
                </PageContainer>
              </PrivateRoute>
            })}
            <Redirect to='/dashboard' />
          </Switch>
        </Router>
      </AuthIsLoaded>
    </>
  );
}

export default App;
