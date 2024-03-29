import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

import {
  Container, Content, Search, Table,
} from './styles';

import ProductService from '../../../services/ProductService';
import MainHeader from '../components/MainHeader';
import HeaderContent from '../components/HeaderContent';
import InputSearch from '../../../components/InputSearch';
import ErrorList from '../../../components/ErrorList';
import Loader from '../../../components/Loader';
import { confirmeDeletAlert, errorAlert } from '../../../utils/showAlert';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await ProductService.listProducts();
      setHasError(false);
      setProducts(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => products.filter((product) => (
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )), [products, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await ProductService.deleteProduct(id);
      loadProducts();
      setIsLoading(true);
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir produto: ${err}` });
    }
  };

  return (
    <Container>
      <MainHeader title="Produtos" />
      {isLoading && <Loader />}
      <Search>
        <InputSearch
          placeholder="Pesquisar produto pelo nome..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>
        <HeaderContent
          hasError={hasError}
          urlNew="/adm/products/new"
          titleButton="Novo produto"
          singularTitle="produto"
          pluralTitle="produtos"
          array={filteredProducts}
        />

        {hasError && (<ErrorList descricao="Ocorreu um erro ao obter a lista de produtos" />)}

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ativo</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td data-title="Nome:">{product.nome}</td>
                  <td data-title="Descrição:" className="desc">{product.descricao}</td>
                  <td data-title="Ativo:">{product.ativo ? 'Sim' : 'Não'}</td>
                  <td>
                    <Link to={`/adm/products/edit/${product.id}`}>
                      <FaEdit className="edit" />
                    </Link>
                    <FaTrash
                      className="remove"
                      onClick={() => confirmeDeletAlert(
                        { msg: 'Produto excluido com sucesso!' },
                        () => handleRemove(product.id),
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
