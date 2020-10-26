import Actions from '../../data/actions.js';
import Control from './control.js';
import ViewportDesktop from '../viewport/viewport__grid.js';

class ControlPlaceItems {

  constructor() {
    this.control = new Control();
    this.viewportGrid = new ViewportDesktop();

    this.classControlAlignItems = 'control__align-items';
    this.classControlJustifyItems = 'control__justify-items';
  }

  getControlJustifyItems() {
    return document.querySelector(`.${this.classControlJustifyItems}`);
  }

  getControlAlignItems() {
    return document.querySelector(`.${this.classControlAlignItems}`);
  }

  createControlJustifyItems() {
    this.createControlJustifyAlignItems({ type: 'justify' });
    this.onChangeJustifyItems();
  }

  createControlAlignItems() {
    this.createControlJustifyAlignItems({ type: 'align' });
    this.onChangeAlignItems();
  }

  createControlJustifyAlignItems(props) {

    const controlJustifyAlignItems = document.createElement('select');

    if (props.type === 'justify') {
      controlJustifyAlignItems.classList.add(this.classControlJustifyItems);
    } else { // === align
      controlJustifyAlignItems.classList.add(this.classControlAlignItems);
    }

    this.control.getControl().append(controlJustifyAlignItems);

    let optionPlaceholder = document.createElement('option');
    optionPlaceholder.setAttribute('disabled', 'disabled');
    optionPlaceholder.setAttribute('selected', 'selected');
    optionPlaceholder.setAttribute('value', '');
    optionPlaceholder.innerHTML = `Set ${props.type}-items`;
    controlJustifyAlignItems.append(optionPlaceholder);

    let options = [ 'start', 'end', 'center', 'stretch' ];
    options.forEach(option => {
      let newOption = document.createElement('option');
      newOption.value = option;
      newOption.innerHTML = option;
      controlJustifyAlignItems.append(newOption);
    })

  }

  onChangeJustifyItems() {

    this.getControlJustifyItems().addEventListener('change', (e) => {
      this.viewportGrid.getViewportDesktop().style.justifyItems = e.target.value;
      Actions.updateJustifyItems(e.target.value);
    });

  }

  onChangeAlignItems() {

    this.getControlAlignItems().addEventListener('change', (e) => {
      this.viewportGrid.getViewportDesktop().style.alignItems = e.target.value;
      Actions.updateAlignItems(e.target.value);
    });

  }

  render() {
    this.createControlJustifyItems();
    this.createControlAlignItems();
  }

}

export default ControlPlaceItems;