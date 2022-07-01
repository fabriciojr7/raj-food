import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Container, Form, ButtonContainer,
} from './styles';

import SettingsService from '../../../services/SettingsService';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import MainHeader from '../components/MainHeader';
// import formatPhone from '../../../utils/formatPhone';
import Loader from '../../../components/Loader';
import { errorAlert, sucessAlert } from '../../../utils/showAlert';

const schema = yup.object({
  nome: yup.string().required('O nome do restaurante é obrigatório.').min(3, 'O nome requer pelo menos 3 caracteres.'),
  descricao: yup.string().required('A descricão é obrigatória.'),
  fone: yup.string().required('O telefone é obrigatório.'),
  endereco: yup.string().required('O endereço é obrigatório.'),
  taxa: yup.number('O valor da entrega deve ser numérico'),
}).required();

export default function Settings() {
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
      const { data } = await SettingsService.getSettings();
      setValue('nome', data.nome);
      setValue('descricao', data.descricao);
      setValue('fone', data.fone);
      setValue('endereco', data.endereco);
      setValue('taxa', data.valor_envio);
      setValue('aberto', data.aberto);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do restaurante' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataType();
  }, []);

  const onSubmit = async (data) => {
    try {
      const dataRestaurante = {
        id_cliente: 1,
        nome: data.nome,
        descricao: data.descricao,
        fone: data.fone,
        endereco: data.endereco,
        valorEnvio: data.taxa,
        aberto: data.aberto,
      };

      await SettingsService.updateSettings(dataRestaurante);
      sucessAlert({ msg: 'Cadastro alterado com sucesso' });
      navigate('/adm');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Container>
      <MainHeader title="Configurações do restaurante" />
      {isLoading && <Loader />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGrouping error={errors.nome?.message}>
          <Input
            error={errors.nome?.message}
            placeholder="Nome do restaurante"
            {...register('nome')}
          />
        </FormGrouping>

        <FormGrouping error={errors.descricao?.message}>
          <TextArea
            error={errors.descricao?.message}
            placeholder="Descrição ou slogan do restaurante"
            {...register('descricao')}
          />
        </FormGrouping>

        <FormGrouping error={errors.fone?.message}>
          <Input
            error={errors.fone?.message}
            placeholder="Telefone *"
            {...register('fone')}
          />
        </FormGrouping>

        <FormGrouping error={errors.endereco?.message}>
          <Input
            error={errors.endereco?.message}
            placeholder="Endereço *"
            {...register('endereco')}
          />
        </FormGrouping>

        <FormGrouping error={errors.taxa?.message}>
          <Input
            error={errors.taxa?.message}
            placeholder="Taxa de entrega *"
            {...register('taxa')}
          />
        </FormGrouping>

        <ButtonContainer>
          <Button type="submit">Salvar as configurações</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
