import Actions from '../../data/actions.js';
import Control from './control.js';
import ControlPlaceItems from '../control/control__place-items.js';
import ControlPrefix from '../control/control__prefix.js';
import ControlShorthand from '../control/control__shorthand.js';
import ViewportArea from '../viewport/viewport__area.js';

class ControlReset {

  constructor() {
    this.control = new Control();
    this.controlShorthand = new ControlShorthand();
    this.controlPlaceItems = new ControlPlaceItems();
    this.controlPrefix = new ControlPrefix();
    this.viewportArea = new ViewportArea();

    this.classControlReset = 'control__reset';
  }

  createControlReset() {

    const reset = document.createElement('button');
    reset.classList.add(this.classControlReset);
    reset.innerHTML = 'Reset Grid';
    this.control.getControl().append(reset);

    reset.addEventListener('click', this.onClickReset.bind(this));
  }

  onClickReset() {

    if ( confirm('Are you sure?') ) {

      this.controlShorthand.getControlShorthand().checked = this.controlShorthand.checked;
      Actions.updateShorthand(this.controlShorthand.checked);

      this.controlPrefix.getControlPrefix().checked = this.controlPrefix.checked;
      Actions.updatePrefix(this.controlPrefix.checked);

      this.controlPlaceItems.getControlJustifyItems().value = '';
      Actions.updateJustifyItems('');

      this.controlPlaceItems.getControlAlignItems().value = '';
      Actions.updateAlignItems('');

      this.viewportArea.createViewportAreas();
    }

  }

  render() {
    this.createControlReset();
  }

}

export default ControlReset;