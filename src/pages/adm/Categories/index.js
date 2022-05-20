import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

import {
  Container, Content, Search, Table,
} from './styles';

import CategoriaService from '../../../services/CategoriaService';
import MainHeader from '../components/MainHeader';
import HeaderContent from '../components/HeaderContent';
import InputSearch from '../../../components/InputSearch';
import ErrorList from '../../../components/ErrorList';
import Loader from '../../../components/Loader';
import { confirmeDeletAlert, errorAlert } from '../../../utils/showAlert';

export default function Categories() {
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadTypes = async () => {
    try {
      setIsLoading(true);
      const { data } = await CategoriaService.listCategories();
      setHasError(false);
      setTypes(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const filteredTypes = useMemo(() => types.filter((type) => (
    type.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )), [types, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await CategoriaService.deleteCategory(id);
      loadTypes();
      setIsLoading(true);
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir categoria: ${err}` });
    }
  };

  return (
    <Container>
      <MainHeader title="Categorias" />
      {isLoading && <Loader />}
      <Search>
        <InputSearch
          placeholder="Pesquisar categoria pelo nome..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>
        <HeaderContent
          hasError={hasError}
          urlNew="/adm/categories/new"
          titleButton="Nova categoria"
          singularTitle="categoria"
          pluralTitle="categorias"
          array={filteredTypes}
        />

        {hasError && (<ErrorList descricao="Ocorreu um erro ao obter a lista dos tipos de produtos" />)}

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredTypes.map((type) => (
                <tr key={type.id}>
                  <td data-title="Nome">{type.nome}</td>
                  <td>
                    <Link to={`/adm/categories/edit/${type.id}`}>
                      <FaEdit className="edit" />
                    </Link>

                    <FaTrash
                      className="remove"
                      onClick={() => confirmeDeletAlert(
                        { msg: 'Categoria excluido com sucesso!' },
                        () => handleRemove(type.id),
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
