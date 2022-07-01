import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdPerson, MdOutlineListAlt, MdOutlineAccessTime } from 'react-icons/md';
import { Menu } from './styles';
import { AuthContext } from '../../../../context/auth';

export default function MenuItems({ id = 'menu' }) {
  const { client } = useContext(AuthContext);

  return (
    <Menu id={id}>
      <button type="button">
        Seja bem vindo,
        {' '}
        {client.nome}
      </button>
      <ul>
        <Link to="/profile">
          <li>
            <MdPerson className="ico" size={20} />
            Perfil
          </li>
        </Link>
        <Link to="/pedidosAndamento">
          <li>
            <MdOutlineAccessTime className="ico" size={20} />
            Acompanhar pedido
          </li>

        </Link>
        <Link to="/historico">
          <li>
            <MdOutlineListAlt className="ico" size={20} />
            Histórico de pedidos
          </li>
        </Link>
      </ul>
    </Menu>
  );
}
