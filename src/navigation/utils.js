const getCurrentRouteName = ({ index, routes }) => {
  const { routeName } = routes[index];

  return routeName;
};

const getCurrentParams = ({ index, routes }) => {
  const { params } = routes[index];

  return params || {};
};

export { getCurrentRouteName, getCurrentParams };
