import swal from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';
import './dialog.css';

swal.setDefaults({
  title: '[title]',
  text: '[text',
  type: 'info',
  allowEscapeKey: true
});

swal.info = (options, cb) => {
  options = Object.assign({
    type: 'info'
  }, options);

  swal(options, cb);
};

swal.infoConfirm = (options, cb) => {
  options = Object.assign({
    showCancelButton: true,
    confirmButtonColor: '#00BCD4',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No'
  }, options);

  swal.info(options, cb);
};

swal.warn = (options, cb) => {
  options = Object.assign({
    type: 'warning'
  }, options);

  swal(options, cb);
};

swal.warnConfirm = (options, cb) => {
  options = Object.assign({
    showCancelButton: true,
    confirmButtonColor: '#FF5722',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No'
  }, options);

  swal.warn(options, cb);
};

swal.success = (options, cb) => {
  options = Object.assign({
    type: 'success'
  }, options);

  swal(options, cb);
};

swal.successConfirm = (options, cb) => {
  options = Object.assign({
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No'
  }, options);

  swal.success(options, cb);
};

swal.error = (options, cb) => {
  options = Object.assign({
    type: 'error'
  }, options);

  swal(options, cb);
};

swal.errorConfirm = (options, cb) => {
  options = Object.assign({
    showCancelButton: true,
    confirmButtonColor: '#F44336',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No'
  }, options);

  swal.error(options, cb);
};

export default swal;
