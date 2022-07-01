import { useEffect, useState, useContext } from 'react';
import Title from '../components/Title';

import {
  Container, ListArea, Description,
  CardPedido, InfosPedido, ItensOrder,
} from './styles';

import { AuthContext } from '../../../context/auth';
import PedidoService from '../../../services/PedidoService';
import Loader from '../../../components/Loader';
import { errorAlert } from '../../../utils/showAlert';

export default function OrderHistory() {
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

  const statusLabelBtn = (status) => {
    if (status === 0) {
      return 'Pedido Cancelado';
    }
    return 'Pedido entregue';
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <Title>Histórico de pedidos concluídos</Title>
      <ListArea>
        {
          pedidos.map((pedido) => (
            pedido.status === 0 || pedido.status === 5 ? (
              <CardPedido key={pedido.id}>
                <Description>
                  Detalhes do pedido (
                  <span>{statusLabelBtn(pedido.status)}</span>
                  )
                </Description>

                <InfosPedido>
                  <p>
                    Endereço de entrega:
                    {' '}
                    <span>Trabalho</span>
                  </p>

                  <p>
                    Total do pedido:
                    {' '}
                    <span>R$ 50,00</span>
                  </p>
                </InfosPedido>

                <ItensOrder>
                  <p className="titleItens">Itens do seu pedido</p>

                  <ul>
                    <li>
                      <p>
                        Item:
                        {' '}
                        <span>X-tudo dos brabos</span>
                      </p>

                      <p>
                        Quantidade:
                        {' '}
                        <span>2 x</span>
                      </p>

                      <p>
                        Total item:
                        {' '}
                        <span>R$ 25,00</span>
                      </p>
                    </li>

                    <li>
                      <p>
                        Item:
                        {' '}
                        <span>X-tudo dos brabos</span>
                      </p>

                      <p>
                        Quantidade:
                        {' '}
                        <span>2 x</span>
                      </p>

                      <p>
                        Total item:
                        {' '}
                        <span>R$ 25,00</span>
                      </p>
                    </li>

                    <li>
                      <p>
                        Item:
                        {' '}
                        <span>X-tudo dos brabos</span>
                      </p>

                      <p>
                        Quantidade:
                        {' '}
                        <span>2 x</span>
                      </p>

                      <p>
                        Total item:
                        {' '}
                        <span>R$ 25,00</span>
                      </p>
                    </li>
                  </ul>
                </ItensOrder>
              </CardPedido>
            ) : null
          ))
        }

      </ListArea>
    </Container>
  );
}
