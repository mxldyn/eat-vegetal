import { filter, some } from '../../utils/async';

const mergeList = (currentData, newData, key = 'id') => [
  ...currentData,
  ...filter(
    newData,
    newItem =>
      !some(currentData, currentItem => currentItem[key] === newItem[key])
  )
];

export { mergeList };
