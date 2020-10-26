import Actions from '../../data/actions.js';
import Control from './control.js';

class ControlPrefix {

  constructor() {
    this.control = new Control();

    this.classControlPrefix = 'control__prefix';

    this.checked = false;
  }

  getControlPrefix() {
    return document.querySelector(`.${this.classControlPrefix}`);
  }

  createControlPrefix() {

    const labelPrefix = document.createElement('label');
    labelPrefix.innerHTML = 'Prefix';
    labelPrefix.setAttribute('for', 'prefix');
    this.control.getControl().append(labelPrefix);

    const controlPrefix = document.createElement('input');
    controlPrefix.setAttribute('id', 'prefix');
    controlPrefix.setAttribute('type', 'checkbox');
    controlPrefix.checked = this.checked;
    controlPrefix.classList.add(this.classControlPrefix);
    this.control.getControl().append(controlPrefix);

    Actions.updatePrefix(this.checked);

    this.onChangePrefixUpdateStore();
  }

  onChangePrefixUpdateStore() {

    this.getControlPrefix().addEventListener('change', (e) => {
      Actions.updatePrefix(e.target.checked);
    });

  }

  render() {
    this.createControlPrefix();
  }

}

export default ControlPrefix;