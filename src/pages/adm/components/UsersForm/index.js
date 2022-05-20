import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useErrors from '../../../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import UserService from '../../../../services/UserService';
import isEmailValid from '../../../../utils/isEmailValid';
import formatPhone from '../../../../utils/formatPhone';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

export default function UsersForm({ id, buttonLabel }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [fone, setFone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const getDataProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await UserService.getUser(id);
      setNome(data.nome);
      setSobrenome(data.sobrenome);
      setFone(data.fone);
      setEmail(data.email);
    } catch (err) {
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDataProduct();
    }
  }, []);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    if (!e.target.value) {
      setError({ field: 'nome', message: 'Nome é obrigatório.' });
    } else {
      removeError('nome');
    }
  };

  const handleSobrenomeChange = (e) => {
    setSobrenome(e.target.value);
    if (!e.target.value) {
      setError({ field: 'sobrenome', message: 'O sobrenome é obrigatório.' });
    } else {
      removeError('descricao');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  };

  const handlePhoneChange = (e) => {
    setFone(formatPhone(e.target.value));
  };

  const handleConfirmaSenhaChange = (e) => {
    setConfirmaSenha(e.target.value);
    if (e.target.value !== senha) {
      setError({ field: 'confirmaSenha', message: 'A confirmação e a senha devem ser iguais.' });
    } else {
      removeError('confirmaSenha');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataUser = {
        nome,
        sobrenome,
        fone,
        email,
      };
      if (senha !== '') {
        dataUser = {
          ...dataUser,
          password: senha,
        };
      }
      if (id) {
        const { message } = await UserService.updateUser(id, dataUser);
        sucessAlert({ msg: message });
      } else {
        const { message } = await UserService.createUser(dataUser);
        sucessAlert({ msg: message });
      }
      navigate('/adm/users');
    } catch (err) {
      errorAlert({ msg: err });
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

      <FormGrouping error={getErrorsMEssageByFieldName('sobrenome')}>
        <Input
          error={getErrorsMEssageByFieldName('sobrenome')}
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={handleSobrenomeChange}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Telefone"
          value={fone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorsMEssageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('confirmaSenha')}>
        <Input
          error={getErrorsMEssageByFieldName('confirmaSenha')}
          type="password"
          placeholder="Confirmar senha"
          value={confirmaSenha}
          onChange={handleConfirmaSenhaChange}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
