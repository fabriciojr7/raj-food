import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, ButtonContainer,
} from './styles';

import useErrors from '../../../../hooks/useErrors';

import ClientService from '../../../../services/ClientService';
import isEmailValid from '../../../../utils/isEmailValid';
import formatPhone from '../../../../utils/formatPhone';
import Input from '../../../../components/Input';
import FormGrouping from '../../../../components/FormGrouping';
import Button from '../../../../components/Button';
import { errorAlert, sucessAlert } from '../../../../utils/showAlert';

export default function ClientForm({ id, buttonLabel }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [fone, setFone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const navigate = useNavigate();

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

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
      removeError('sobrenome');
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
      const dataCli = {
        nome,
        sobrenome,
        fone,
        email,
        password: senha,
      };

      if (id) {
        await ClientService.updateClient(id, dataCli);
        sucessAlert({ msg: 'Cadastro alterado com sucesso' });
      } else {
        await ClientService.createClient(dataCli);
        sucessAlert({ msg: 'Cadastro efetuado com sucesso' });
        navigate('/login');
      }
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
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
