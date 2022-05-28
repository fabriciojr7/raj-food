import { Link } from 'react-router-dom';
import { MdPerson, MdOutlineListAlt, MdOutlineAccessTime } from 'react-icons/md';
import { Menu } from './styles';

export default function MenuItems({ id = 'menu' }) {
  return (
    <Menu id={id}>
      <button type="button">Seja bem vindo, Fulano</button>
      <ul>
        <Link to="/profile">
          <li>
            <MdPerson className="ico" size={20} />
            Perfil
          </li>
        </Link>
        <Link to="/">
          <li>
            <MdOutlineAccessTime className="ico" size={20} />
            Acompanhar pedido
          </li>

        </Link>
        <Link to="/">
          <li>
            <MdOutlineListAlt className="ico" size={20} />
            Histórico de pedidos
          </li>
        </Link>
      </ul>
    </Menu>
  );
}
