const mapVegetables = data =>
  data.map(({ id, ...rest }) => ({
    ...rest,
    key: id,
    source: {
      uri:
        'https://images.unsplash.com/photo-1500099817043-86d46000d58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    id,
    iconImage: 'https://avatars2.githubusercontent.com/u/45196619?s=460&v=4'
  }));

export { mapVegetables };
