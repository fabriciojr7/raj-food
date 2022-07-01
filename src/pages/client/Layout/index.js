import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from '../../../context/cart';

import { Container } from './styles';

export default function Layout() {
  return (
    <CartProvider>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </CartProvider>
  );
}
