import { useEffect, useState, useMemo } from 'react';

import ProductService from '../../../services/ProductService';
import CategoriaService from '../../../services/CategoriaService';
import CardProd from '../components/CardProd';
import InputSearch from '../../../components/InputSearch';
import ErrorList from '../../../components/ErrorList';
import Loader from '../../../components/Loader';

import {
  AreaProd, Category, SearchProduct, Text, Box,
} from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const { data } = await CategoriaService.listCategories();
      setHasError(false);
      setCategories(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => products.filter((product) => (
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )), [products, searchTerm]);

  return (
    <>
      <SearchProduct>
        <InputSearch
          placeholder="Pesquisar item no cardapio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchProduct>
      {isLoading && <Loader />}
      {hasError && (<ErrorList descricao="Ocorreu um erro ao obter a lista dos tipos de produtos" />)}
      {
          categories.map((cat) => (
            <Category key={cat.id}>
              {filteredProducts.length > 0
                ? (
                  <Box>
                    <h2>{cat.nome}</h2>
                    <Text>{cat.descricao}</Text>
                  </Box>
                ) : null}

              <AreaProd>
                {
                  filteredProducts.map((prod) => (
                    cat.id === prod.id_categoria ? (
                      <CardProd
                        key={prod.id}
                        nome={prod.nome}
                        descricao={prod.descricao}
                        preco={prod.preco}
                        imagem={prod.image}
                      />
                    ) : null
                  ))
                }
              </AreaProd>
            </Category>
          ))
      }
    </>
  );
}
