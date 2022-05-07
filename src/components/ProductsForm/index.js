import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import ProductService from '../../services/ProductService';
import TypeProductService from '../../services/TypeProductService';
import FormGrouping from '../FormGrouping';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';
import Button from '../Button';
import UploadDropZone from '../UploadDropZone';
import Loader from '../Loader';

export default function ProductsForm({ id, buttonLabel }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [tipo, setTipo] = useState(0);
  const [precoPadrao, setPrecoPadrao] = useState(0);
  const [precoPequena, setPrecoPequena] = useState(0);
  const [precoGrande, setPrecoGrande] = useState(0);
  const [typeProducts, setTypeProducts] = useState([]);
  const [useSize, setUseSize] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const tableSizeVisible = (idType) => {
    typeProducts.forEach((typeProd) => {
      if (typeProd.id === Number(idType)) {
        setUseSize(typeProd.tem_tamanho);
      }
    });
  };

  const getDataProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await ProductService.getProduct(id);
      setNome(data.nome);
      setDescricao(data.descricao);
      setAtivo(data.ativo);
      setPrecoPadrao(data.preco_m);
      setPrecoPequena(data.preco_p);
      setPrecoGrande(data.preco_g);
      setSelectedFile(data.image);
      setTipo(data.id_tipo_produto);
      tableSizeVisible(data.id_tipo_produto);
    } catch (err) {
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    async function loadTypes() {
      const { data } = await TypeProductService.listTypes();
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
    setTipo(e.target.value);
    tableSizeVisible(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataProd = new FormData();
      dataProd.append('nome', nome);
      dataProd.append('descricao', descricao);
      dataProd.append('id_tipo_produto', tipo);
      dataProd.append('ativo', ativo);
      dataProd.append('preco_m', precoPadrao);
      dataProd.append('preco_p', precoPequena);
      dataProd.append('preco_g', precoGrande);
      if (selectedFile) {
        dataProd.append('image', selectedFile);
      }

      if (id) {
        const { message } = await ProductService.updateProduct(id, dataProd);
        alert(message);
      } else {
        const { message } = await ProductService.createProduct(dataProd);
        alert(message);
      }
      navigate('/adm/products');
    } catch (err) {
      // console.log(err);
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
          value={tipo}
          onChange={handleTypeProductChange}
        >
          <option value={0}>Selecione o tipo de produto</option>
          {
            typeProducts.map((type) => (
              <option key={type.id} value={type.id}>{type.nome}</option>
            ))
          }
        </Select>
      </FormGrouping>

      {useSize
        && (
          <FormGrouping>
            <p>Pequena</p>
            <Input
              placeholder="Preco"
              value={precoPequena}
              onChange={(e) => setPrecoPequena(e.target.value)}
            />
          </FormGrouping>
        )}

      <FormGrouping>
        {useSize && <p>Média (padrão)</p>}
        <Input
          placeholder="Preco *"
          value={precoPadrao}
          onChange={(e) => setPrecoPadrao(e.target.value)}
        />
      </FormGrouping>

      {useSize
        && (
          <FormGrouping>
            <p>Grande</p>
            <Input
              placeholder="Preco"
              value={precoGrande}
              onChange={(e) => setPrecoGrande(e.target.value)}
            />
          </FormGrouping>
        )}

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
