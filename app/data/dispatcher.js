import Store from './store.js';

let Dispatcher = {

  state: {},

  create() {
    window.store = this.state;
    return window.store;
  },

  set(key, value) {
    window.store[key] = value;
    this.react(key, value);
    return window.store[key];
  },

  get(key) {
    return window.store[key];
  },

  getState() {
    return window.store;
  },

  update(key, value) {
    window.store[key] = value;
    this.react(key, value);
    return window.store[key];
  },

  delete(key) {
    this.react(key, null);
    delete window.store[key];
  },

  dispatch(action) {
    let entries = Object.entries(action);
    entries.forEach((entry) => {
      if (entry[0] !== 'type') {
        action.name = entry[0];
        action.value = entry[1];
      }
    })
    Store.reduce(this, action);
  },

  react(name, value) {
    let nodes = document.querySelectorAll(`[reactive="${name}"]`);
    let nodesValue = [ 'INPUT', 'TEXTAREA' ];
    nodes.forEach(node => {
      if (nodesValue.includes(node.nodeName)) {
        node.value = value;
      } else {
        node.innerHTML = value;
      }
    })
  }
}

export default Dispatcher;