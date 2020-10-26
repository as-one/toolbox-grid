let presets = {
  classicHolyGrail: {
    name: 'Classic Holy Grail',
    parent: {
      gridTemplateColumns: {
        styleSplit: 'repeat(4, 1fr);'
      },
      gridTemplateRows: {
        styleSplit: 'repeat(3, 1fr);'
      }
    },
    children: [
      {
        name: 'header',
        gridArea: '1 / 1 / 2 / 5'
      },
      {
        name: 'left-sidebar',
        gridArea: '2 / 1 / 3 / 2'
      },
      {
        name: 'main-content',
        gridArea: '2 / 2 / 3 / 4'
      },
      {
        name: 'right-sidebar',
        gridArea: '2 / 4 / 3 / 5'
      },
      {
        name: 'footer',
        gridArea: '3 / 1 / 4 / 5'
      },
    ]
  },

  twelveSpanGrid: {
    name: 'Twelve Span Grid',
    parent: {
      gridTemplateColumns: {
        styleSplit: 'repeat(12, 1fr);'
      },
      gridTemplateRows: {
        styleSplit: '1fr;'
      }
    },
    children: [
      {
        name: 'span-12',
        gridArea: '1 / 1 / 1 / 13',
      },
      {
        name: 'span-6',
        gridArea: '1 / 1 / 1 / 7',
      },
      {
        name: 'span-4',
        gridArea: '1 / 4 / 1 / 9',
      },
      {
        name: 'span-2',
        gridArea: '1 / 3 / 1 / 5',
      },
    ]
  }
};

export default presets;