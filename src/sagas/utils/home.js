const mapVegetables = data =>
  data.map(({ id, textColor, backgroundColor, pages, ...rest }) => ({
    ...rest,
    key: id,
    source: {
      uri:
        'https://www.pikpng.com/pngl/b/303-3039915_collage-de-frutas-png-clipart.png'
    },
    id,
    textColor: `#${textColor}`,
    backgroundColor: `#${backgroundColor}`,
    iconImage: 'https://avatars2.githubusercontent.com/u/45196619?s=460&v=4',
    pages: pages.map(p => ({
      ...p,
      familyColor: `#${p.familyColor}`,
      image:
        'https://www.pikpng.com/pngl/b/303-3039915_collage-de-frutas-png-clipart.png'
    }))
  }));

export { mapVegetables };
