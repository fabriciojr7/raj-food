import { useState, useEffect } from 'react';
import { MdPowerSettingsNew } from 'react-icons/md';
import {
  Container, HeaderRestaurante, ToggleStatus,
} from './styles';

import SettingsService from '../../../services/SettingsService';
import Loader from '../../../components/Loader';
import { errorAlert, sucessAlert } from '../../../utils/showAlert';

export default function Dashboard() {
  const [aberto, setAberto] = useState(true);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fone, setFone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [taxa, setTaxa] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleToggleStatus = async () => {
    if (aberto) {
      sucessAlert({ msg: 'Restaurante aberto' });
      setAberto(false);
    } else {
      sucessAlert({ msg: 'Restaurante fechado' });
      setAberto(true);
    }

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
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <HeaderRestaurante>
        <span>RajFOOD</span>
        <ToggleStatus onClick={handleToggleStatus} status={aberto}>
          <MdPowerSettingsNew />
        </ToggleStatus>
      </HeaderRestaurante>
    </Container>
  );
}
