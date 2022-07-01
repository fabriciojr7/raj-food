import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ClientForm from '../components/ClientForm';
import AddressService from '../../../services/AddressService';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../context/auth';
import Title from '../components/Title';

import {
  Container, Content, Line, ListAdresses, TitleAdresses,
  CartAddress, Actions, Removed, Edit,
} from './styles';

import { confirmeDeletAlert, errorAlert } from '../../../utils/showAlert';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState([]);
  const { client } = useContext(AuthContext);

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

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await AddressService.deleteAddress(id);
      loadAddress();
      setIsLoading(true);
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir endereço: ${err}` });
    }
  };

  return (
    <Container>
      <Content>
        <Title>Meu Perfil</Title>
        {isLoading && <Loader />}
        <ClientForm id={client.id} />
        <Line />
        <ListAdresses>
          <TitleAdresses>
            <h2>Meus endereços</h2>
            <Link to="/profile/address">
              Adicionar
            </Link>
          </TitleAdresses>

          <ul>
            {
              address.map((addr) => (
                <CartAddress key={addr.id}>
                  <h4>{addr.descricao}</h4>
                  <Actions>
                    <Edit>
                      <Link to={`/profile/address/edit/${addr.id}`}>
                        <FaEdit />
                      </Link>
                    </Edit>
                    <Removed>
                      <FaTrash
                        onClick={() => confirmeDeletAlert(
                          { msg: 'Endereço excluido com sucesso!' },
                          () => handleRemove(addr.id),
                        )}
                      />
                    </Removed>
                  </Actions>
                </CartAddress>
              ))
            }
          </ul>

        </ListAdresses>
      </Content>
    </Container>
  );
}
