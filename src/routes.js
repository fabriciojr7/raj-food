import { useContext } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

// ADM
import LayoutAdm from './pages/adm/LayoutAdm'; // private
import AdmLogin from './pages/adm/AdmLogin'; // public
import Dashboard from './pages/adm/DashBoard'; // private
import Products from './pages/adm/Products'; // private
import NewProducts from './pages/adm/NewProducts'; // private
import EditProducts from './pages/adm/EditProducts'; // private
import Categories from './pages/adm/Categories'; // private
import NewCategories from './pages/adm/NewCategories'; // private
import EditCategories from './pages/adm/EditCategories'; // private
import Users from './pages/adm/Users'; // private
import NewUSer from './pages/adm/NewUser'; // private
import EditUser from './pages/adm/EditUser'; // private
import Settings from './pages/adm/Settings'; // private

// Cliente
import Layout from './pages/client/Layout'; // private
import Home from './pages/client/Home'; // public
import MyCart from './pages/client/MyCart'; // private
import FinalizeOrder from './pages/client/FinalizeOrder';
import Profile from './pages/client/Profile'; // private
import Address from './pages/client/Address'; // private
import EditAddress from './pages/client/EditAddress'; // private
import LoginSignUpLayout from './pages/client/LoginSignUpLayout'; // public
import Login from './pages/client/Login'; // public
import SignUp from './pages/client/SignUp'; // public

import { AuthContext, AuthProvider } from './context/auth';
import TrackOrder from './pages/client/TrackOrder';
import OrderHistory from './pages/client/OrderHistory';

function PrivateRouteClient({ children }) {
  const { clientAuthenticated } = useContext(AuthContext);

  if (!clientAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

function RedirectClient({ children }) {
  const { clientAuthenticated } = useContext(AuthContext);

  if (clientAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

function PrivateRouteAdm({ children }) {
  const { admAuthenticated } = useContext(AuthContext);

  if (!admAuthenticated) {
    return <Navigate to="/adm/login" />;
  }
  return children;
}

function RedirectAdm({ children }) {
  const { admAuthenticated } = useContext(AuthContext);

  if (admAuthenticated) {
    return <Navigate to="/adm" />;
  }
  return children;
}

export default function MainRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={(<Home />)} />

            <Route
              path="/profile"
              element={(
                <PrivateRouteClient>
                  <Profile />
                </PrivateRouteClient>
              )}
            />

            <Route
              path="/cart"
              element={(
                <PrivateRouteClient>
                  <MyCart />
                </PrivateRouteClient>
              )}
            />

            <Route
              path="/finalizar"
              element={(
                <PrivateRouteClient>
                  <FinalizeOrder />
                </PrivateRouteClient>
              )}
            />

            <Route
              path="/profile/address"
              element={(
                <PrivateRouteClient>
                  <Address />
                </PrivateRouteClient>
              )}
            />

            <Route
              path="/profile/address/edit/:id"
              element={(
                <PrivateRouteClient>
                  <EditAddress />
                </PrivateRouteClient>
              )}
            />

            <Route
              path="/historico"
              element={(
                <PrivateRouteClient>
                  <OrderHistory />
                </PrivateRouteClient>
              )}
            />

            <Route
              path="/pedidosAndamento"
              element={(
                <PrivateRouteClient>
                  <TrackOrder />
                </PrivateRouteClient>
              )}
            />

          </Route>

          <Route
            path="/login"
            element={(
              <RedirectClient>
                <LoginSignUpLayout />
              </RedirectClient>
            )}
          >
            <Route index element={<Login />} />
            <Route path="/login/signUp" element={<SignUp />} />
          </Route>

          <Route
            path="/adm"
            element={(
              <PrivateRouteAdm>
                <LayoutAdm />
              </PrivateRouteAdm>
            )}
          >
            <Route index element={<Dashboard />} />
            <Route path="/adm/Products" element={<Products />} />
            <Route path="/adm/Products/new" element={<NewProducts />} />
            <Route path="/adm/Products/edit/:id" element={<EditProducts />} />
            <Route path="/adm/categories" element={<Categories />} />
            <Route path="/adm/categories/new" element={<NewCategories />} />
            <Route path="/adm/categories/edit/:id" element={<EditCategories />} />
            <Route path="/adm/users" element={<Users />} />
            <Route path="/adm/users/new" element={<NewUSer />} />
            <Route path="/adm/users/edit/:id" element={<EditUser />} />
            <Route path="/adm/settings" element={<Settings />} />
          </Route>

          <Route
            path="/adm/login"
            element={(
              <RedirectAdm>
                <AdmLogin />
              </RedirectAdm>
            )}
          />
        </Routes>
      </AuthProvider>

    </Router>
  );
}
