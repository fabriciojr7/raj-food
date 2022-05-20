import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useErrors from '../../../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import ProductService from '../../../../services/ProductService';
import CategoriaService from '../../../../services/CategoriaService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import UploadDropZone from '../../UploadDropZone';
import Loader from '../../../../components/Loader';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

export default function ProductsForm({ id, buttonLabel }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [categoria, setCategoria] = useState(0);
  const [preco, setPreco] = useState(0);
  const [typeProducts, setTypeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const getDataProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await ProductService.getProduct(id);
      setNome(data.nome);
      setDescricao(data.descricao);
      setAtivo(data.ativo);
      setPreco(data.preco);
      setSelectedFile(data.image);
      setCategoria(data.id_categoria);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do produto' });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    async function loadTypes() {
      const { data } = await CategoriaService.listCategories();
      setTypeProducts(data);
    }
    loadTypes();
    if (id) {
      getDataProduct();
    }
  }, []);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    if (!e.target.value) {
      setError({ field: 'nome', message: 'Nome é obrigatório.' });
    } else {
      removeError('nome');
    }
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
    if (!e.target.value) {
      setError({ field: 'descricao', message: 'A descrição do produto é obrigatória.' });
    } else {
      removeError('descricao');
    }
  };

  const handleTypeProductChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataProd = new FormData();
      dataProd.append('nome', nome);
      dataProd.append('descricao', descricao);
      dataProd.append('id_categoria', categoria);
      dataProd.append('ativo', ativo);
      dataProd.append('preco', preco);
      if (selectedFile) {
        dataProd.append('image', selectedFile);
      }

      if (id) {
        await ProductService.updateProduct(id, dataProd);
        sucessAlert({ msg: 'Produto alterado com sucesso' });
      } else {
        await ProductService.createProduct(dataProd);
        sucessAlert({ msg: 'Produto cadastrado com sucesso' });
      }
      navigate('/adm/products');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {isLoading && <Loader />}

      <FormGrouping error={getErrorsMEssageByFieldName('nome')}>
        <Input
          error={getErrorsMEssageByFieldName('nome')}
          placeholder="Nome *"
          value={nome}
          onChange={handleNomeChange}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('descricao')}>
        <TextArea
          error={getErrorsMEssageByFieldName('descricao')}
          placeholder="Descrição"
          value={descricao}
          onChange={handleDescricaoChange}
        />
      </FormGrouping>

      <FormGrouping>
        <Select
          value={categoria}
          onChange={handleTypeProductChange}
        >
          <option value={0}>Selecione a categoria do produto</option>
          {
            typeProducts.map((type) => (
              <option key={type.id} value={type.id}>{type.nome}</option>
            ))
          }
        </Select>
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Preco *"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping>
        <p>Produto ativo</p>
        <Select
          value={ativo}
          onChange={(e) => setAtivo(e.target.value)}
        >
          <option value>Sim</option>
          <option value={false}>Não</option>
        </Select>
      </FormGrouping>

      <UploadDropZone onFileUpload={setSelectedFile} filePro={selectedFile} />

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
