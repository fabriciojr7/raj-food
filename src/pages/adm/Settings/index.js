import { useState, useEffect } from 'react';
import {
  Container, Form, ButtonContainer,
} from './styles';

import useErrors from '../../../hooks/useErrors';

import SettingsService from '../../../services/SettingsService';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import MainHeader from '../components/MainHeader';
import formatPhone from '../../../utils/formatPhone';
import Loader from '../../../components/Loader';
import { errorAlert, sucessAlert } from '../../../utils/showAlert';

export default function Dashboard() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fone, setFone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [taxa, setTaxa] = useState(0);
  const [aberto, setAberto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const getDataType = async () => {
    try {
      setIsLoading(true);
      const { data } = await SettingsService.getSettings();
      setNome(data.nome);
      setDescricao(data.descricao);
      setFone(data.fone);
      setEndereco(data.endereco);
      setTaxa(data.valor_envio);
      setAberto(data.aberto);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do restaurante' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataType();
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
      setError({ field: 'descricao', message: 'O Descriço é obrigatório.' });
    } else {
      removeError('descricao');
    }
  };

  const handleEnderecoChange = (e) => {
    setEndereco(e.target.value);
    if (!e.target.value) {
      setError({ field: 'endereco', message: 'O endereço é obrigatório.' });
    } else {
      removeError('endereco');
    }
  };

  const handleFoneChange = (e) => {
    setFone(formatPhone(e.target.value));
    if (!e.target.value) {
      setError({ field: 'fone', message: 'O telefone é obrigatório.' });
    } else {
      removeError('fone');
    }
  };

  const handleTaxaChange = (e) => {
    setTaxa(e.target.value);
    if (!e.target.value) {
      setError({ field: 'taxa', message: 'A taxa de entrega é obrigatória.' });
    } else {
      removeError('taxa');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataRestaurante = {
        id_cliente: 1,
        nome,
        descricao,
        fone,
        endereco,
        valorEnvio: taxa,
        aberto,
      };

      await SettingsService.updateSettings(dataRestaurante);
      sucessAlert({ msg: 'Cadastro alterado com sucesso' });
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Container>
      <MainHeader title="Configurações do restaurante" />
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <FormGrouping error={getErrorsMEssageByFieldName('nome')}>
          <Input
            error={getErrorsMEssageByFieldName('nome')}
            value={nome}
            placeholder="Nome do restaurante"
            onChange={handleNomeChange}
          />
        </FormGrouping>

        <FormGrouping error={getErrorsMEssageByFieldName('descricao')}>
          <TextArea
            error={getErrorsMEssageByFieldName('descricao')}
            value={descricao}
            placeholder="Descrição ou slogan do restaurante"
            onChange={handleDescricaoChange}
          />
        </FormGrouping>

        <FormGrouping error={getErrorsMEssageByFieldName('fone')}>
          <Input
            error={getErrorsMEssageByFieldName('fone')}
            value={fone}
            placeholder="Telefone *"
            onChange={handleFoneChange}
          />
        </FormGrouping>

        <FormGrouping error={getErrorsMEssageByFieldName('endereco')}>
          <Input
            error={getErrorsMEssageByFieldName('endereco')}
            value={endereco}
            placeholder="Endereço *"
            onChange={handleEnderecoChange}
          />
        </FormGrouping>

        <FormGrouping error={getErrorsMEssageByFieldName('taxa')}>
          <Input
            error={getErrorsMEssageByFieldName('taxa')}
            value={taxa}
            placeholder="Taxa de entrega *"
            onChange={handleTaxaChange}
          />
        </FormGrouping>

        <ButtonContainer>
          <Button type="submit" disabled={!isFormValid}>Salvar as configurações</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
