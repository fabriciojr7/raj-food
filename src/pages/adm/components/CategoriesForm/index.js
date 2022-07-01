import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, ButtonContainer } from './styles';

import CategoriaService from '../../../../services/CategoriaService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório.').min(3, 'O nome requer pelo menos 3 caracteres.'),
  descricao: yup.string().required('A descrição é obrigatória.'),
}).required();

export default function CategoriesForm({ id, buttonLabel }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataType = async () => {
    try {
      setIsLoading(true);
      const { data } = await CategoriaService.getCategory(id);
      setValue('nome', data.nome);
      setValue('descricao', data.descricao);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados da categoria' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getDataType();
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const dataTypes = {
        nome: data.nome,
        descricao: data.descricao,
      };
      if (id) {
        await CategoriaService.updateCategory(id, dataTypes);
        sucessAlert({ msg: 'Categoria alterada com sucesso' });
      } else {
        await CategoriaService.createCategory(dataTypes);
        sucessAlert({ msg: 'Categoria cadastrada com sucesso' });
      }
      navigate('/adm/categories');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}

      <FormGrouping error={errors.nome?.message}>
        <Input
          placeholder="Nome *"
          {...register('nome')}
          error={errors.nome?.message}
        />
      </FormGrouping>

      <FormGrouping error={errors.descricao?.message}>
        <TextArea
          placeholder="Descrição"
          {...register('descricao')}
          error={errors.descricao?.message}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
