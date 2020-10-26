import Actions from '../../data/actions.js';
import Control from './control.js';

class ControlShorthand {

  constructor() {
    this.control = new Control();

    this.classControlShorthand = 'control__shorthand';

    this.checked = true;
  }

  createControlShorthand() {

    const labelShorthand = document.createElement('label');
    labelShorthand.innerHTML = 'Shorthand';
    labelShorthand.setAttribute('for', 'shorthand');
    this.control.getControl().append(labelShorthand);

    const controlShorthand = document.createElement('input');
    controlShorthand.setAttribute('id', 'shorthand');
    controlShorthand.setAttribute('type', 'checkbox');
    controlShorthand.checked = this.checked;
    controlShorthand.classList.add(this.classControlShorthand);
    this.control.getControl().append(controlShorthand);

    Actions.updateShorthand(this.checked);

    this.onChangeShorthandUpdateStore();
  }

  getControlShorthand() {
    return document.querySelector(`.${this.classControlShorthand}`);
  }

  onChangeShorthandUpdateStore() {

    this.getControlShorthand().addEventListener('change', (e) => {
      Actions.updateShorthand(e.target.checked);
    });

  }

  render() {
    this.createControlShorthand();
  }

}

export default ControlShorthand;