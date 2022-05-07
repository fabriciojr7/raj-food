import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import TypeProductService from '../../services/TypeProductService';
import FormGrouping from '../FormGrouping';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';
import Button from '../Button';
import Loader from '../Loader';

export default function TypeProductsForm({ id, buttonLabel }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [temTamanho, setTemTamanho] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const getDataType = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await TypeProductService.getType(id);
      setNome(data.nome);
      setDescricao(data.descricao);
      setTemTamanho(data.tem_tamanho);
    } catch (err) {
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDataType();
    }
  }, [getDataType, id]);

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

  const handleTemTamanhoChange = (e) => {
    setTemTamanho(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataTypes = {
        nome,
        descricao,
        tem_tamanho: temTamanho,
      };

      if (id) {
        const { message } = await TypeProductService.updateType(id, dataTypes);
        alert(message);
      } else {
        const { message } = await TypeProductService.createType(dataTypes);
        alert(message);
      }
      navigate('/adm/typeProducts');
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

      <FormGrouping tam>
        <p>Produtos terão mais de um tamanho(valor)?</p>
        <Select
          value={temTamanho}
          onChange={handleTemTamanhoChange}
        >
          <option value>Sim</option>
          <option value={false}>Não</option>
        </Select>
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
