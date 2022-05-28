import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, ButtonContainer,
} from './styles';

import useErrors from '../../../../hooks/useErrors';

import AddressService from '../../../../services/AddressService';
import CepService from '../../../../services/CepService';
import formatCep from '../../../../utils/formatCep';
import Input from '../../../../components/Input';
import FormGrouping from '../../../../components/FormGrouping';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import { errorAlert, sucessAlert } from '../../../../utils/showAlert';

export default function EnderecoForm({ id, buttonLabel }) {
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (descricao && errors.length === 0);

  const getDataType = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await AddressService.getAddress(id);
      setDescricao(data.descricao);
      setCep(data.cep);
      setRua(data.rua);
      setNumero(data.numero);
      setBairro(data.bairro);
      setCidade(data.cidade);
      setEstado(data.estado);
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

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
    if (!e.target.value) {
      setError({ field: 'descricao', message: 'A descrição é obrigatória.' });
    } else {
      removeError('descricao');
    }
  };

  const handleCepChange = (e) => {
    setCep(formatCep(e.target.value));
    if (!e.target.value) {
      setError({ field: 'cep', message: 'O CEP é obrigatório.' });
    } else {
      removeError('cep');
    }
  };

  const chekCep = async () => {
    if (cep !== '') {
      const data = await CepService.buscaCep(cep);
      setRua(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      setEstado(data.uf);
    }
  };

  const handleRuaChange = (e) => {
    setRua(e.target.value);
    if (!e.target.value) {
      setError({ field: 'rua', message: 'A rua é obrigatória.' });
    } else {
      removeError('rua');
    }
  };

  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
    if (!e.target.value) {
      setError({ field: 'numero', message: 'O número é obrigatório.' });
    } else {
      removeError('numero');
    }
  };

  const handleBairrohange = (e) => {
    setBairro(e.target.value);
    if (!e.target.value) {
      setError({ field: 'bairro', message: 'O bairro é obrigatório.' });
    } else {
      removeError('bairro');
    }
  };

  const handleCidadeChange = (e) => {
    setCidade(e.target.value);
    if (!e.target.value) {
      setError({ field: 'cidade', message: 'A cidade é obrigatória.' });
    } else {
      removeError('cidade');
    }
  };

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
    if (!e.target.value) {
      setError({ field: 'estado', message: 'O estado é obrigatório.' });
    } else {
      removeError('estado');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataEnd = {
        id_cliente: 1,
        descricao,
        cep,
        rua,
        bairro,
        cidade,
        estado,
        numero,
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
    <Form onSubmit={handleSubmit}>
      {isLoading && <Loader />}
      <FormGrouping error={getErrorsMEssageByFieldName('descricao')}>
        <Input
          error={getErrorsMEssageByFieldName('descricao')}
          placeholder="Descrição exemplo: Endereço principal *"
          value={descricao}
          onChange={handleDescricaoChange}
          maxLength="30"
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('cep')}>
        <Input
          error={getErrorsMEssageByFieldName('cep')}
          placeholder="CEP *"
          value={cep}
          onChange={handleCepChange}
          onBlur={chekCep}
          maxLength="9"
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('rua')}>
        <Input
          error={getErrorsMEssageByFieldName('rua')}
          placeholder="Rua *"
          value={rua}
          onChange={handleRuaChange}
          maxLength="15"
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('numero')}>
        <Input
          error={getErrorsMEssageByFieldName('numero')}
          placeholder="Número"
          value={numero}
          onChange={handleNumeroChange}
          maxLength="20"
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('bairro')}>
        <Input
          error={getErrorsMEssageByFieldName('bairro')}
          placeholder="Bairro *"
          value={bairro}
          onChange={handleBairrohange}
          maxLength="60"
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('cidade')}>
        <Input
          error={getErrorsMEssageByFieldName('cidade')}
          placeholder="Cidade *"
          value={cidade}
          onChange={handleCidadeChange}
          maxLength="60"
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('estado')}>
        <Input
          error={getErrorsMEssageByFieldName('estado')}
          placeholder="Estado *"
          value={estado}
          onChange={handleEstadoChange}
          maxLength="30"
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button type="button" onClick={() => navigate('/profile')}>Cancelar</Button>
      </ButtonContainer>
    </Form>
  );
}
