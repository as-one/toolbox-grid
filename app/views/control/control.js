import ControlColumnRowGap from './control__column-row-gap.js';
import ControlColumnsRows from './control__columns-rows.js';
import ControlHeading from './control__heading.js';
import ControlPrefix from './control__prefix.js';
import ControlPlaceItems from './control__place-items.js';
import ControlReset from './control__reset.js';
import ControlShorthand from './control__shorthand.js';
import ControlLink from './control__link.js';

class Control {

  constructor() {
    this.classControl = 'control';
  }

  getControl() {
    return document.querySelector(`.${this.classControl}`);
  }

  createControl() {
    const control = document.createElement('div');
    control.classList.add(this.classControl);
    document.body.append(control);
  }

  render() {
    this.createControl();

    const controlHeading = new ControlHeading();
    controlHeading.render();

    const controlColumnsRows = new ControlColumnsRows();
    controlColumnsRows.render();

    const controlColumnRowGap = new ControlColumnRowGap();
    controlColumnRowGap.render();

    const controlShorthand = new ControlShorthand();
    controlShorthand.render();

    const controlPrefix = new ControlPrefix();
    controlPrefix.render();

    const controlPlaceItems = new ControlPlaceItems();
    controlPlaceItems.render();

    const controlReset = new ControlReset();
    controlReset.render();

    const controlLink = new ControlLink();
    controlLink.render();
  }

}

export default Control;