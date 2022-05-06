import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

import {
  Container, Content, Search, Table,
} from './styles';

import TypeProductService from '../../../services/TypeProductService';
import MainHeader from '../../../components/MainHeader';
import HeaderContent from '../../../components/HeaderContent';
import InputSearch from '../../../components/InputSearch';
import ErrorList from '../../../components/ErrorList';
import Loader from '../../../components/Loader';

export default function TypeProducts() {
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadTypes = async () => {
    try {
      setIsLoading(true);
      const { data } = await TypeProductService.listTypes();
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
    type.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [types, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      const { message } = await TypeProductService.deleteType(id);
      loadTypes();
      setIsLoading(true);
      console.log(message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <MainHeader title="Tipos de produtos" />
      {isLoading && <Loader />}
      <Search>
        <InputSearch
          placeholder="Pesquisar tipo de produto pelo nome..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>
        <HeaderContent
          hasError={hasError}
          urlNew="/adm/typeProducts/new"
          titleButton="Novo Tipo de produto"
          singularTitle="tipo de produto"
          pluralTitle="tipo de produtos"
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
                    <Link to={`/adm/typeProducts/edit/${type.id}`}>
                      <FaEdit className="edit" />
                    </Link>

                    <FaTrash className="remove" onClick={() => handleRemove(type.id)} />
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
