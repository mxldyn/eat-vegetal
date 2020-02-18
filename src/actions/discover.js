import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    uploadImage: ['uri'],
    setStatus: ['key', 'value']
  },
  {
    prefix: 'DISCOVER/'
  }
);

const { uploadImage, setStatus } = Creators;

const { UPLOAD_IMAGE, SET_STATUS } = Types;

export { Types, uploadImage, setStatus, UPLOAD_IMAGE, SET_STATUS };

export default Creators;
