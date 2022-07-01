import { useEffect, useState, useContext } from 'react';
import { MdCheck, MdDeliveryDining, MdFastfood } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { BsFillCursorFill } from 'react-icons/bs';
import { GoSmiley } from 'react-icons/go';

import Title from '../components/Title';

import {
  Container, Content, Description, StatusBar, Progress,
  CardPedido, InfosPedido, ItensOrder,
} from './styles';

import { AuthContext } from '../../../context/auth';
import PedidoService from '../../../services/PedidoService';
import Loader from '../../../components/Loader';
import { errorAlert } from '../../../utils/showAlert';

export default function TrackOrder() {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { client } = useContext(AuthContext);

  const getPedidos = async () => {
    try {
      setIsLoading(true);
      const { data } = await PedidoService.getPedido(client.id);
      setPedidos(data);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados dos pedidos' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPedidos();
  }, []);

  return (
    <Container>
      {isLoading && <Loader />}
      <Title>Meus pedidos em andamento</Title>
      <Content>
        {
      pedidos.map((pedido) => (
        pedido.status === 0 ? null : (
          <CardPedido key={pedido.id}>
            <Description>
              Detalhes e progresso do pedido
            </Description>

            <InfosPedido>
              <p>
                Endereço de entrega:
                {' '}
                <span>{pedido.endereco.descricao}</span>
              </p>

              <p>
                Total do pedido:
                {' '}
                <span>
                  R$
                  {' '}
                  {pedido.total}
                </span>
              </p>
            </InfosPedido>

            <ItensOrder>
              <p className="titleItens">Itens do seu pedido</p>
              <ul>
                {
                pedido.produtos.map((produto) => (
                  <li key={produto.id}>
                    <p>
                      Item:
                      {' '}
                      <span>{produto.nome}</span>
                    </p>

                    <p>
                      Quantidade:
                      {' '}
                      <span>
                        {produto.pivot_quantidade}
                        {' '}
                        x
                      </span>
                    </p>

                    <p>
                      Total item:
                      {' '}
                      <span>
                        R$
                        {' '}
                        {produto.pivot_valor_total_item}
                      </span>
                    </p>
                  </li>
                ))
              }
              </ul>
            </ItensOrder>

            <StatusBar>
              <li>
                <div className="top-bar" />
                <Progress className="one active">
                  <span><BsFillCursorFill /></span>
                  <MdCheck className="uil" />
                </Progress>
                <p className="text">Pedido enviado</p>
              </li>
              <li>
                <div className="top-bar" />
                <Progress className={pedido.status >= 2 ? 'active' : ''}>
                  <span><AiFillLike /></span>
                  <MdCheck className="uil" />
                </Progress>
                <p className="text">Pedido aprovado</p>
              </li>
              <li>
                <div className="top-bar" />
                <Progress className={pedido.status >= 3 ? 'active' : ''}>
                  <span><MdFastfood /></span>
                  <MdCheck className="uil" />
                </Progress>
                <p className="text">Preparando pedido</p>
              </li>
              <li>
                <div className="top-bar" />
                <Progress className={pedido.status >= 4 ? 'active' : ''}>
                  <span><MdDeliveryDining /></span>
                  <MdCheck className="uil" />
                </Progress>
                <p className="text">Saiu para entrega</p>
              </li>
              <li>
                <div className="top-bar" />
                <Progress className={pedido.status >= 5 ? 'active' : ''}>
                  <span><GoSmiley /></span>
                  <MdCheck className="uil" />
                </Progress>
                <p className="text">Pedido finalizado</p>
              </li>
            </StatusBar>
          </CardPedido>
        )
      ))

    }

      </Content>
    </Container>
  );
}
