import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useErrors from '../../../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import CategoriaService from '../../../../services/CategoriaService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

export default function CategoriesForm({ id, buttonLabel }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const getDataType = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await CategoriaService.getCategory(id);
      setNome(data.nome);
      setDescricao(data.descricao);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados da categoria' });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataTypes = {
        nome,
        descricao,
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

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
