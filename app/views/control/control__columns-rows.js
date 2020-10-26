import Control from './control.js';
import ViewportArea from '../viewport/viewport__area.js';
import ViewportBtn from '../viewport/viewport__btn.js';

class ControlColumnsRows {

  constructor() {
    this.control = new Control();

    this.viewportArea = new ViewportArea();
    this.viewportBtn = new ViewportBtn();

    this.classControlColumns = 'control__columns';
    this.classControlRows = 'control__rows';
  }

  getControlColumns() {
    return document.querySelector(`.${this.classControlColumns}`);
  }

  getControlRows() {
    return document.querySelector(`.${this.classControlRows}`);
  }

  createControlColumns() {

    this.createControlColumnsRows({
      placeholder: 'Columns',
      class: this.classControlColumns,
      value: this.viewportArea.getGridTemplateColumns().total,
      reactive: 'column'
    });

    this.onChangeInputSetColumns();
  }

  createControlRows() {

    this.createControlColumnsRows({
      placeholder: 'Rows',
      class: this.classControlRows,
      value: this.viewportArea.getGridTemplateRows().total,
      reactive: 'row'
    });

    this.onChangeInputSetRows();
  }

  createControlColumnsRows(props) {

    const labelSetColumns = document.createElement('label');
    labelSetColumns.innerHTML = props.placeholder;
    labelSetColumns.setAttribute('for', props.placeholder.toLowerCase());
    this.control.getControl().append(labelSetColumns);

    const inputSetColumns = document.createElement('input');
    inputSetColumns.setAttribute('id', props.placeholder.toLowerCase());
    inputSetColumns.setAttribute('type', 'number');
    inputSetColumns.setAttribute('placeholder', props.placeholder);
    inputSetColumns.setAttribute('min', 1);
    inputSetColumns.classList.add(props.class);
    inputSetColumns.setAttribute('value', props.value);
    inputSetColumns.setAttribute('reactive', props.reactive);
    this.control.getControl().append(inputSetColumns);

  }

  onChangeInputSetColumns() {

    this.getControlColumns().addEventListener('change', (e) => {

      this.onChangeInputSetColumnsRows({
        type: 'column',
        element: e.target
      });

    });
  }

  onChangeInputSetRows() {
    this.getControlRows().addEventListener('change', (e) => {

      this.onChangeInputSetColumnsRows({
        type: 'row',
        element: e.target
      })

    });
  }

  onChangeInputSetColumnsRows(props) {

    let currentValue = Number(props.element.getAttribute('value'));
    let newValue = Number(props.element.value);

    let action;
    if (newValue > currentValue) {
      action = 'add';
    } else
    if (newValue < currentValue) {
      action = 'remove';
    }

    if (props.type === 'column') {
      this.viewportBtn.setColumnOnViewport({ action: action });
    } else { // === row
      this.viewportBtn.setRowOnViewport({ action: action });
    }

    props.element.setAttribute('value', props.element.value);
  }

  render() {
    this.createControlColumns();
    this.createControlRows();
  }

}

export default ControlColumnsRows;