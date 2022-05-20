import Swal from 'sweetalert2';

export const sucessAlert = ({ msg }) => {
  Swal.fire({
    title: 'Sucesso',
    text: msg,
    icon: 'success',
    showConfirmButton: false,
    timer: '2000',
  });
};

export const errorAlert = ({ msg }) => {
  Swal.fire({
    title: 'Erro',
    text: msg,
    icon: 'error',
    buton: 'OK',
    timer: '2000',
  });
};

export const confirmeDeletAlert = (msg, func) => {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Essa operação é irreversível!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir!',
  }).then((result) => {
    if (result.isConfirmed) {
      func();
      Swal.fire(
        'Excluido!',
        msg,
        'success',
      );
    }
  });
};
