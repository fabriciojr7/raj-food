import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPerson, MdOutlineListAlt, MdOutlineAccessTime } from 'react-icons/md';
import { Menu } from './styles';

export default function MenuItems({ id = 'menu' }) {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleMenu = () => {
    setMenuOpened((prevState) => (!prevState));
  };

  return (
    <Menu id={id} className={menuOpened ? 'active' : ''}>
      <button type="button">Seja bem vindo, Fulano</button>
      <ul>
        <Link onClick={handleMenu} to="/profile">
          <li>
            <MdPerson className="ico" size={20} />
            Perfil
          </li>
        </Link>
        <Link onClick={handleMenu} to="/pedido">
          <li>
            <MdOutlineAccessTime className="ico" size={20} />
            Acompanhar pedido
          </li>

        </Link>
        <Link onClick={handleMenu} to="/historico">
          <li>
            <MdOutlineListAlt className="ico" size={20} />
            Histórico de pedidos
          </li>
        </Link>
      </ul>
    </Menu>
  );
}
