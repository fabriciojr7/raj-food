import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AddressService from '../../../services/AddressService';
import PedidoService from '../../../services/PedidoService';
import DetalhesPedidoService from '../../../services/DetalhesPedidoService';
import Loader from '../../../components/Loader';
import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import Select from '../../../components/Select';
import Input from '../../../components/Input';

import { AuthContext } from '../../../context/auth';
import { CartContext } from '../../../context/cart';

import {
  Container, Content, Title,
  ResumoOrder, TitleSection, HeaderResume,
  NomeItem, QtdItem, SubTotItem, ItemPedido,
  FooterFinalizacao, AddressInfo, Finalizacao, TotalPedido,
} from './styles';

export default function FinalizeOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState([]);
  const [endereco, setEndereco] = useState(0);
  const [formaPag, setFormaPag] = useState(1);
  const [valorInformado, setValorInformado] = useState('');
  const { client } = useContext(AuthContext);
  const { productsCart, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const loadAddress = async () => {
    try {
      setIsLoading(true);
      const { data } = await AddressService.listAddressClient(client.id);
      // setHasError(false);
      setAddress(data);
    } catch {
      // setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddress();
  }, []);

  const totalPedido = () => {
    const inicial = 0;
    const total = productsCart.reduce((soma, valor) => soma + valor.subtotal, inicial);
    return total;
  };

  const handleEnviaPedido = async () => {
    let troco = (Number(valorInformado) - totalPedido());
    if (troco < 0) {
      troco *= (-1);
    }
    try {
      const dataPedido = {
        id_cliente: client.id,
        id_restaurante: 1,
        id_endereco: Number(endereco),
        total: totalPedido(),
        forma_pagamento: formaPag,
        troco,
      };

      const { data } = await PedidoService.createPedido(dataPedido);

      productsCart.forEach(async (prod) => {
        const dataDetalhe = {
          pedidoId: data.id,
          produtoId: prod.id,
          quantidade: prod.qtd,
          valor_total_item: prod.subtotal,
        };
        await DetalhesPedidoService.createDetalhe(dataDetalhe);
      });

      clearCart();
      navigate('/');
    } catch (err) {
      console('erro ao realizar pedido:', err);
    }
  };

  return (
    <Container>
      <Title>
        <h1>Finalizar o pedido</h1>
      </Title>
      <Content>
        {isLoading && <Loader />}

        <AddressInfo>
          <TitleSection>Informe o endereço para entrega</TitleSection>

          <FormGrouping>
            <Select
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            >
              <option value={0}>Selecione o endereço</option>
              {
                address.map((add) => (
                  <option key={add.id} value={add.id}>{add.descricao}</option>
                ))
              }
            </Select>
          </FormGrouping>

        </AddressInfo>

        <ResumoOrder>
          <TitleSection>Resumo do pedido</TitleSection>

          <HeaderResume>
            <NomeItem>Nome do produto</NomeItem>
            <QtdItem>Quantidade</QtdItem>
            <SubTotItem>Subtotal</SubTotItem>
          </HeaderResume>
          <ul>
            {
              productsCart.map((prod) => (
                <ItemPedido key={prod.id}>
                  <NomeItem>{prod.nome}</NomeItem>
                  <QtdItem>{prod.qtd}</QtdItem>
                  <SubTotItem>{prod.subtotal}</SubTotItem>
                </ItemPedido>
              ))
            }
          </ul>

        </ResumoOrder>

        <Finalizacao>
          <TitleSection>Total e forma de pagamento</TitleSection>

          <FormGrouping>
            <Select
              value={formaPag}
              onChange={(e) => setFormaPag(e.target.value)}
            >
              <option value={1}>Dinheiro</option>
              <option value={2}>Cartão</option>
              <option value={3}>Pix</option>
            </Select>
          </FormGrouping>

          {
              Number(formaPag) === 1 ? (
                <FormGrouping>
                  <Input
                    value={valorInformado}
                    onChange={(e) => setValorInformado(e.target.value)}
                    placeholder="Valor que irá pagar em dinheiro"
                  />
                </FormGrouping>
              ) : null
            }

          <TotalPedido>
            Total do Pedido:
            {' '}
            <span>
              R$
              {' '}
              {totalPedido()}
            </span>
          </TotalPedido>

        </Finalizacao>

        <FooterFinalizacao>
          <Button onClick={() => navigate('/cart')}>Alterar pedido</Button>

          <Button onClick={handleEnviaPedido}>Enviar Pedido</Button>
        </FooterFinalizacao>

      </Content>
    </Container>
  );
}
