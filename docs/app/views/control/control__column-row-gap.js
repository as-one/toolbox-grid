import Actions from '../../data/actions.js';
import Control from './control.js';
import ViewportArea from '../viewport/viewport__area.js';
import ViewportDesktop from '../viewport/viewport__grid.js';

class ControlColumnRowGap {

  constructor() {
    this.control = new Control();

    this.viewportArea = new ViewportArea();
    this.viewportGrid = new ViewportDesktop();

    this.classControlColumnGap = 'control__column-gap';
    this.classControlRowGap = 'control__row-gap';
  }

  getControlColumnGap() {
    return document.querySelector(`.${this.classControlColumnGap}`);
  }

  getControlRowGap() {
    return document.querySelector(`.${this.classControlRowGap}`);
  }

  createControlColumnGap() {

    this.createControlColumnRowGap({
      placeholder: 'Column Gap',
      forId: 'column-gap',
      class: this.classControlColumnGap,
      reactive: 'columnGap'
    });

    Actions.updateColumnGap(this.viewportArea.parseGapValues(this.viewportArea.gap));

    this.onChangeInputSetColumnGap();
  }

  createControlRowGap() {

    this.createControlColumnRowGap({
      placeholder: 'Row Gap',
      forId: 'row-gap',
      class: this.classControlRowGap,
      reactive: 'rowGap'
    });

    Actions.updateRowGap(this.viewportArea.parseGapValues(this.viewportArea.gap));

    this.onChangeInputSetRowGap();
  }

  createControlColumnRowGap(props) {

    const labelSetColumnRowGap = document.createElement('label');
    labelSetColumnRowGap.innerHTML = props.placeholder;
    labelSetColumnRowGap.setAttribute('for', props.forId);
    this.control.getControl().append(labelSetColumnRowGap);

    const inputSetColumnRowGap = document.createElement('input');
    inputSetColumnRowGap.setAttribute('id', props.forId);
    inputSetColumnRowGap.setAttribute('type', 'number');
    inputSetColumnRowGap.setAttribute('placeholder', props.placeholder);
    inputSetColumnRowGap.setAttribute('min', 0);
    inputSetColumnRowGap.classList.add(props.class);
    inputSetColumnRowGap.setAttribute('value', '0px');
    inputSetColumnRowGap.setAttribute('reactive', props.reactive);
    this.control.getControl().append(inputSetColumnRowGap);

  }

  onChangeInputSetColumnGap() {
    this.getControlColumnGap().addEventListener('change', (e) => {
      let value = this.viewportArea.parseGapValues(e.target.value);
      this.viewportGrid.getViewportDesktop().style.gridColumnGap = value.string;
      Actions.updateColumnGap(value);
    });
  }

  onChangeInputSetRowGap() {
    this.getControlRowGap().addEventListener('change', (e) => {
      let value = this.viewportArea.parseGapValues(e.target.value);
      this.viewportGrid.getViewportDesktop().style.gridRowGap = value.string;
      Actions.updateRowGap(value);
    });
  }

  render() {
    this.createControlColumnGap();
    this.createControlRowGap();
  }

}

export default ControlColumnRowGap;