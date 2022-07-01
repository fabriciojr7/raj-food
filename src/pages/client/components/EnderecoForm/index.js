import {
  useState, useEffect, useCallback, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Form, ButtonContainer,
} from './styles';

import { AuthContext } from '../../../../context/auth';
import AddressService from '../../../../services/AddressService';
import CepService from '../../../../services/CepService';
import Input from '../../../../components/Input';
import FormGrouping from '../../../../components/FormGrouping';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import { errorAlert, sucessAlert } from '../../../../utils/showAlert';

const schema = yup.object({
  descricao: yup.string().required('A descrição é obrigatória.').min(3, 'O nome requer pelo menos 3 caracteres.'),
  cep: yup.string().required('O CEP é obrigatório.'),
  rua: yup.string().required('A rua é obrigatória.'),
  numero: yup.string().required('O numero é obrigatório.'),
  bairro: yup.string().required('O bairro é obrigatório.'),
  cidade: yup.string().required('A cidade é obrigatória.'),
  estado: yup.string().required('O estado é obrigatório.'),
}).required();

export default function EnderecoForm({ id, buttonLabel }) {
  const [isLoading, setIsLoading] = useState(false);
  const { client } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors }, setValue, setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataType = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await AddressService.getAddress(id);
      setValue('descricao', data.descricao);
      setValue('cep', data.cep);
      setValue('rua', data.rua);
      setValue('numero', data.numero);
      setValue('bairro', data.bairro);
      setValue('cidade', data.cidade);
      setValue('estado', data.estado);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do endereço' });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDataType();
    }
  }, [getDataType, id]);

  const chekCep = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if ((cep !== '') && (cep.length === 8)) {
      try {
        setIsLoading(true);
        const data = await CepService.buscaCep(cep);
        setValue('rua', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('estado', data.uf);
        setFocus('numero');
      } catch (err) {
        errorAlert({ msg: 'Erro ao buscar dados do CEP' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const dataEnd = {
        id_cliente: client.id,
        descricao: data.descricao,
        cep: data.cep,
        rua: data.rua,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        numero: data.numero,
      };

      if (id) {
        await AddressService.updateAddress(id, dataEnd);
        sucessAlert({ msg: 'Cadastro alterado com sucesso' });
      } else {
        await AddressService.createAddress(dataEnd);
        sucessAlert({ msg: 'Cadastro efetuado com sucesso' });
      }
      navigate('/profile');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}
      <FormGrouping error={errors.descricao?.message}>
        <Input
          error={errors.descricao?.message}
          placeholder="Descrição exemplo: Endereço principal *"
          {...register('descricao')}
        />
      </FormGrouping>

      <FormGrouping error={errors.cep?.message}>
        <Input
          error={errors.cep?.message}
          placeholder="CEP *"
          {...register('cep')}
          onBlur={chekCep}
        />
      </FormGrouping>

      <FormGrouping error={errors.rua?.message}>
        <Input
          error={errors.rua?.message}
          placeholder="Rua *"
          {...register('rua')}
        />
      </FormGrouping>

      <FormGrouping error={errors.numero?.message}>
        <Input
          error={errors.numero?.message}
          placeholder="Número"
          {...register('numero')}
        />
      </FormGrouping>

      <FormGrouping error={errors.bairro?.message}>
        <Input
          error={errors.bairro?.message}
          placeholder="Bairro *"
          {...register('bairro')}
        />
      </FormGrouping>

      <FormGrouping error={errors.cidade?.message}>
        <Input
          error={errors.cidade?.message}
          placeholder="Cidade *"
          {...register('cidade')}
        />
      </FormGrouping>

      <FormGrouping error={errors.estado?.message}>
        <Input
          error={errors.estado?.message}
          placeholder="Estado *"
          {...register('estado')}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button type="button" onClick={() => navigate('/profile')}>Cancelar</Button>
      </ButtonContainer>
    </Form>
  );
}
