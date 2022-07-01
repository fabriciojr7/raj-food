import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório.').min(3, 'O nome requer pelo menos 3 caracteres.'),
  descricao: yup.string().required('A descrição é obrigatória.'),
  categoria: yup.number().min(1, 'A categoria é obrigatória.'),
  preco: yup.string().required('O preço é obrigatório.'),
}).required();

export default function ProductsForm({ id, buttonLabel }) {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await ProductService.getProduct(id);
      setValue('nome', data.nome);
      setValue('descricao', data.descricao);
      setValue('ativo', data.ativo);
      setValue('preco', data.preco);
      setSelectedFile(data.image);
      setValue('categoria', data.id_categoria);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do produto' });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    async function loadTypes() {
      const { data } = await CategoriaService.listCategories();
      setCategory(data);
    }
    loadTypes();
    if (id) {
      getDataProduct();
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const dataProd = new FormData();
      dataProd.append('nome', data.nome);
      dataProd.append('descricao', data.descricao);
      dataProd.append('id_categoria', Number(data.categoria));
      dataProd.append('ativo', data.ativo);
      dataProd.append('preco', Number(data.preco));
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}

      <FormGrouping error={errors.nome?.message}>
        <Input
          error={errors.nome?.message}
          placeholder="Nome *"
          {...register('nome')}
        />
      </FormGrouping>

      <FormGrouping error={errors.descricao?.message}>
        <TextArea
          error={errors.descricao?.message}
          placeholder="Descrição *"
          {...register('descricao')}
        />
      </FormGrouping>

      <FormGrouping error={errors.categoria?.message}>
        <Select
          {...register('categoria')}
          error={errors.categoria?.message}
        >
          <option value={0}>Selecione a categoria do produto</option>
          {
            category.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))
          }
        </Select>
      </FormGrouping>

      <FormGrouping error={errors.preco?.message}>
        <Input
          error={errors.preco?.message}
          placeholder="Preco *"
          {...register('preco')}
        />
      </FormGrouping>

      <FormGrouping>
        <p>Produto ativo</p>
        <Select
          {...register('ativo')}
        >
          <option value>Sim</option>
          <option value={false}>Não</option>
        </Select>
      </FormGrouping>

      <UploadDropZone onFileUpload={setSelectedFile} filePro={selectedFile} />

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
