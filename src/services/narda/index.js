import createImages from './images';
import createVegetables from './vegetables';
import createTips from './tips';

const nardaApi = {
  images: createImages(),
  vegetables: createVegetables(),
  tips: createTips()
};

export default nardaApi;
