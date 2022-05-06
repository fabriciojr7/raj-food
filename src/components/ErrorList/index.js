import { MdErrorOutline } from 'react-icons/md';
import { Container } from './styles';

import Button from '../Button';

export default function ErrorList({ descricao }) {
  return (
    <Container>
      <MdErrorOutline className="ico" />
      <div className="details">
        <strong>
          {descricao}
        </strong>
        <Button type="button">
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}
