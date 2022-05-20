import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';

// ADM
import LayoutAdm from './pages/adm/LayoutAdm';
import AdmLogin from './pages/adm/AdmLogin';
import Dashboard from './pages/adm/DashBoard';
import Products from './pages/adm/Products';
import NewProducts from './pages/adm/NewProducts';
import EditProducts from './pages/adm/EditProducts';
import Categories from './pages/adm/Categories';
import NewCategories from './pages/adm/NewCategories';
import EditCategories from './pages/adm/EditCategories';
import Users from './pages/adm/Users';
import NewUSer from './pages/adm/NewUser';
import EditUser from './pages/adm/EditUser';

// Cliente
import Layout from './pages/client/Layout';
import Home from './pages/client/Home';
import Profile from './pages/client/Profile';
import LoginSignUpLayout from './pages/client/LoginSignUpLayout';
import Login from './pages/client/Login';
import SignUp from './pages/client/SignUp';

export default function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<LoginSignUpLayout />}>
          <Route index element={<Login />} />
          <Route path="/login/signUp" element={<SignUp />} />
        </Route>

        <Route path="/adm" element={<LayoutAdm />}>
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
        </Route>
        <Route path="/adm/login" element={<AdmLogin />} />

      </Routes>
    </Router>
  );
}
