import ActionTypes from './actionTypes.js';
import Cli from '../views/cli/cli.js';
import Dispatcher from './dispatcher.js';

let Store = {

  create() {
    Dispatcher.create();
  },

  getState() {
    return Dispatcher.getState();
  },

  reduce(state, action) {

    let cli = new Cli();

    switch (action.type) {
      case ActionTypes.UPDATE_COLUMN_GAP:
      case ActionTypes.UPDATE_ROW_GAP:
        cli.setCli();
        return state.set(action.name, action.value.number);

      case ActionTypes.UPDATE_GRID_TEMPLATE_COLUMNS:
      case ActionTypes.UPDATE_GRID_TEMPLATE_ROWS:
        cli.setCli();
        state.set(action.value.type, action.value.total);
        return state.set(action.name, action.value);

      case ActionTypes.UPDATE_SHORTHAND:
      case ActionTypes.UPDATE_PREFIX:
      case ActionTypes.UPDATE_JUSTIFY_ITEMS:
      case ActionTypes.UPDATE_ALIGN_ITEMS:
        cli.setCli();
        return state.set(action.name, action.value);
      default:
        break;
    }
  }

};

export default Store;