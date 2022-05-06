import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';

import LayoutAdm from './pages/adm/LayoutAdm';
import Dashboard from './pages/adm/DashBoard';
import Products from './pages/adm/Products';
import NewProducts from './pages/adm/NewProducts';
import EditProducts from './pages/adm/EditProducts';
import TypeProducts from './pages/adm/TypeProducts';
import NewTypeProducts from './pages/adm/NewTypeProducts';
import EditTypeProducts from './pages/adm/EditTypeProducts';
import Home from './pages/client/Home';

export default function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/adm" element={<LayoutAdm />}>
          <Route index element={<Dashboard />} />
          <Route path="/adm/Products" element={<Products />} />
          <Route path="/adm/Products/new" element={<NewProducts />} />
          <Route path="/adm/Products/edit/:id" element={<EditProducts />} />

          <Route path="/adm/typeProducts" element={<TypeProducts />} />
          <Route path="/adm/typeProducts/new" element={<NewTypeProducts />} />
          <Route path="/adm/typeProducts/edit/:id" element={<EditTypeProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}
