import ActionTypes from './actionTypes.js';
import Dispatcher from './dispatcher.js';

const Actions = {
  updateGridTemplateColumns(gridTemplateColumns) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_GRID_TEMPLATE_COLUMNS,
      gridTemplateColumns
    })
  },
  updateGridTemplateRows(gridTemplateRows) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_GRID_TEMPLATE_ROWS,
      gridTemplateRows
    })
  },
  updateColumnGap(columnGap) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_COLUMN_GAP,
      columnGap
    })
  },
  updateRowGap(rowGap) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_ROW_GAP,
      rowGap
    })
  },
  updateShorthand(shorthand) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_SHORTHAND,
      shorthand
    })
  },
  updatePrefix(prefix) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_PREFIX,
      prefix
    })
  },
  updateJustifyItems(justifyItems) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_JUSTIFY_ITEMS,
      justifyItems
    })
  },
  updateAlignItems(alignItems) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_ALIGN_ITEMS,
      alignItems
    })
  }
}

export default Actions;