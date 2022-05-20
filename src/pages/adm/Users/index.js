import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

import {
  Container, Content, Search, Table,
} from './styles';

import UserService from '../../../services/UserService';
import MainHeader from '../components/MainHeader';
import HeaderContent from '../components/HeaderContent';
import InputSearch from '../../../components/InputSearch';
import ErrorList from '../../../components/ErrorList';
import Loader from '../../../components/Loader';
import { errorAlert, confirmeDeletAlert } from '../../../utils/showAlert';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await UserService.listUsers();
      setHasError(false);
      setUsers(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => users.filter((user) => (
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )), [users, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await UserService.deleteUser(id);
      loadUsers();
      setIsLoading(true);
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir usuário: ${err}` });
    }
  };

  return (
    <Container>
      <MainHeader title="Usuários" />
      {isLoading && <Loader />}
      <Search>
        <InputSearch
          placeholder="Pesquisar usuário pelo nome..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>
        <HeaderContent
          hasError={hasError}
          urlNew="/adm/users/new"
          titleButton="Novo usuário"
          singularTitle="usuário"
          pluralTitle="usuários"
          array={filteredUsers}
        />

        {hasError && (<ErrorList descricao="Ocorreu um erro ao obter a lista de usuários" />)}

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>E-mail</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td data-title="Nome:">{user.nome}</td>
                  <td data-title="Sobrenome:">{user.sobrenome}</td>
                  <td data-title="E-mail:">{user.email}</td>
                  <td>
                    <Link to={`/adm/users/edit/${user.id}`}>
                      <FaEdit className="edit" />
                    </Link>

                    <FaTrash
                      className="remove"
                      onClick={() => confirmeDeletAlert(
                        { msg: 'Usuário excluido com sucesso!' },
                        () => handleRemove(user.id),
                      )}
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>

      </Content>
    </Container>
  );
}
