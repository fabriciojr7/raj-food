import { useState, useEffect } from 'react';
import { MdPowerSettingsNew } from 'react-icons/md';

import {
  Container, HeaderRestaurante, ToggleStatus,
  ListPedidos, Pedido, CabPedido, FooterPedido,
  CabLine, Content, TitleArea, BodyEnd, BodyProd,
} from './styles';

import Button from '../../../components/Button';
import SettingsService from '../../../services/SettingsService';
import PedidoService from '../../../services/PedidoService';
import Loader from '../../../components/Loader';
import { errorAlert, sucessAlert } from '../../../utils/showAlert';

export default function Dashboard() {
  const [aberto, setAberto] = useState(true);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fone, setFone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [taxa, setTaxa] = useState(0);
  const [pedidos, setPedidos] = useState([]);
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

  const getPedidos = async () => {
    try {
      setIsLoading(true);
      const { data } = await PedidoService.listPedidos();
      setPedidos(data);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados dos pedidos' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataType();
    getPedidos();
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

  const cancelarPedido = async (pedido) => {
    try {
      const dataPedido = {
        id_cliente: pedido.id_cliente,
        id_restaurante: 1,
        id_endereco: pedido.id_endereco,
        total: pedido.total,
        forma_pagamento: pedido.forma_pagamento,
        troco: pedido.troco,
        status: 0,
      };
      setIsLoading(true);
      await PedidoService.updatePedido(pedido.id, dataPedido);

      getPedidos();
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados dos pedidos' });
    } finally {
      setIsLoading(false);
    }
  };

  const pagamentoForma = (idForma) => {
    if (idForma === 1) {
      return 'Dinheiro';
    } if (idForma === 2) {
      return 'Cartão';
    }
    return 'Pix';
  };

  const toggleStatusPedido = async (pedido) => {
    try {
      const dataPedido = {
        id_cliente: pedido.id_cliente,
        id_restaurante: 1,
        id_endereco: pedido.id_endereco,
        total: pedido.total,
        forma_pagamento: pedido.forma_pagamento,
        troco: pedido.troco,
        status: pedido.status + 1,
      };
      setIsLoading(true);
      await PedidoService.updatePedido(pedido.id, dataPedido);

      getPedidos();
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados dos pedidos' });
    } finally {
      setIsLoading(false);
    }
  };

  const statusDescricao = (status) => {
    if (status === 1) {
      return ' (Pendente)';
    } if (status === 2) {
      return ' (Aceito)';
    } if (status === 3) {
      return ' (Preparando)';
    } if (status === 4) {
      return ' (Saiu p/ Entrega)';
    } if (status === 5) {
      return ' (Finalizado)';
    }
    return ' (Cancelado)';
  };

  const statusLabelBtn = (status) => {
    if (status === 1) {
      return 'Aceitar pedido';
    } if (status === 2) {
      return 'Preparar pedido';
    } if (status === 3) {
      return 'Entregar pedido';
    }
    return 'Finalizar pedido';
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <HeaderRestaurante>
        <span>{nome}</span>
        <ToggleStatus onClick={handleToggleStatus} status={aberto}>
          <MdPowerSettingsNew />
        </ToggleStatus>
      </HeaderRestaurante>

      <ListPedidos>
        {
          pedidos?.map((pedido) => (
            <Pedido key={pedido.id}>
              <CabPedido>
                <CabLine>
                  <p>
                    Pedido n°:
                    {' '}
                    <span>
                      #
                      {' '}
                      {pedido.id}
                      {' '}
                      {statusDescricao(pedido.status)}

                    </span>
                  </p>

                  <span>
                    {pedido.clientes.nome}
                    {' '}
                    {pedido.clientes.sobrenome}
                  </span>
                </CabLine>

                <CabLine>
                  <p>
                    Forma de pagamento:
                    {' '}
                    <span>{pagamentoForma(pedido.forma_pagamento)}</span>
                  </p>
                </CabLine>

                <CabLine>
                  <p>
                    Total do pedido:
                    {' '}
                    <span>{pedido.total}</span>
                  </p>

                  <p>
                    Troco:
                    {' '}
                    <span>{pedido.troco}</span>
                  </p>
                </CabLine>
              </CabPedido>

              <Content>
                <TitleArea>
                  Endereço
                </TitleArea>
                <BodyEnd>
                  <span>
                    <p>
                      Rua:
                      {' '}
                      {pedido.endereco.rua}
                    </p>

                    <p>
                      Nº
                      {' '}
                      {pedido.endereco.numero}
                    </p>
                  </span>
                  <span>
                    <p>
                      Bairro:
                      {' '}
                      {pedido.endereco.bairro}
                    </p>

                    <p>
                      Cep:
                      {' '}
                      {pedido.endereco.cep}
                    </p>
                  </span>
                  <span>
                    <p>
                      Cidade:
                      {' '}
                      {pedido.endereco.cidade}
                    </p>

                    <p>
                      UF:
                      {' '}
                      {pedido.endereco.estado}
                    </p>
                  </span>
                </BodyEnd>

                <TitleArea>
                  Produtos
                </TitleArea>
                <BodyProd>
                  <li className="header">
                    <span>Descrição</span>
                    <span>Qtd.</span>
                  </li>
                  {
                    pedido.produtos.map((prod) => (
                      <li key={prod.id}>
                        <span>{prod.nome}</span>
                        <span>{prod.pivot_quantidade}</span>
                      </li>
                    ))
                  }

                </BodyProd>

              </Content>

              {pedido.status === 0 || pedido.status === 5 ? null
                : (
                  <FooterPedido>
                    <Button type="button" onClick={() => cancelarPedido(pedido)}>Cancelar</Button>
                    <Button
                      onClick={() => toggleStatusPedido(pedido)}
                    >
                      {statusLabelBtn(pedido.status)}
                    </Button>
                  </FooterPedido>
                )}

            </Pedido>
          ))
        }
      </ListPedidos>
    </Container>
  );
}
