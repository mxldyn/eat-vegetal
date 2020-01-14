const getCurrentRouteName = ({ index, routes }) => {
  const { routeName } = routes[index];

  return routeName;
};

export { getCurrentRouteName };
