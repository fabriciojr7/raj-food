import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { Container } from './styles';

export default function UploadDropZone({ onFileUpload, filePro }) {
  const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    if (filePro) {
      if (typeof filePro === 'string') {
        setFileUrl(filePro);
      } else {
        setFileUrl(URL.createObjectURL(filePro));
      }
    }
  }, [filePro]);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    onFileUpload(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        fileUrl
          ? <img src={fileUrl} alt="Imagem do produto" />
          : (
            <p>
              <FiUpload />
              Imagem do produto
            </p>
          )
      }
    </Container>
  );
}
