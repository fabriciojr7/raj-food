import { Link } from 'react-router-dom';
import {
  Header,
} from './styles';

export default function HeaderContent({
  hasError, urlNew, titleButton, pluralTitle, singularTitle, array,
}) {
  return (
    <Header hasError={hasError}>
      {
        !hasError && (
          <strong>
            {array.length}
            {' '}
            {array.length === 1 ? singularTitle : pluralTitle}
          </strong>
        )
      }

      <Link to={urlNew}>
        <span>{titleButton}</span>
      </Link>
    </Header>
  );
}
