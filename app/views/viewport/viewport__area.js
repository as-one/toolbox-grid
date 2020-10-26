import Actions from '../../data/actions.js';
import Store from '../../data/store.js';
import Viewport from './viewport.js';
import ViewportDesktop from './viewport__grid.js';

class ViewportArea {

  constructor() {
    this.viewport = new Viewport();
    this.viewportGrid = new ViewportDesktop();

    this.classViewportArea = 'viewport__area';
    this.classViewportAreaInput = 'viewport__area_input';
    this.classViewportAreaInputColumn = 'viewport__area_input_column';
    this.classViewportAreaInputRow = 'viewport__area_input_row';

    this.attrDataColStart = 'data-col-start';
    this.attrDataRowStart = 'data-row-start';

    this.viewportAreas = [];
    this.gridTemplateColumns = {};
    this.gridTemplateRows = {};
    this.gap = 0;
  }

  getViewportAreas() {
    return document.querySelectorAll(`.${this.classViewportArea}`);
  }

  getViewportArea(dataColStart, dataRowStart) {
    return document.querySelector(`.${this.classViewportArea}[data-col-start="${dataColStart}"][data-row-start="${dataRowStart}"]`);
  }

  setGridTemplateColumns(gridTemplateColumns) {
    this.parseGridTemplateStyle('column', gridTemplateColumns);
  }

  getGridTemplateColumns() {
    return Store.getState().gridTemplateColumns;
  }

  setGridTemplateRows(gridTemplateRows) {
    this.parseGridTemplateStyle('row', gridTemplateRows);
  }

  getGridTemplateRows() {
    return Store.getState().gridTemplateRows;
  }

  setViewportAreas(updatedAreas) {
    this.viewportAreas = updatedAreas;
  }

  getViewportAreas() {
    return document.querySelectorAll(`.${this.classViewportArea}`);
  }

  getStyleGridArea(rowStart, colStart, rowEnd, colEnd) {
    return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
  }

  getViewportAreaInputColumn() {
    return document.querySelectorAll(`.${this.classViewportAreaInputColumn}`);
  }

  getViewportAreaInputRow() {
    return document.querySelectorAll(`.${this.classViewportAreaInputRow}`);
  }

  createViewportAreaInput(props) {

    const viewportAreaInput = document.createElement('input');
    viewportAreaInput.classList.add(this.classViewportAreaInput);
    viewportAreaInput.setAttribute('placeholder', props.type);
    viewportAreaInput.setAttribute('value', props.value);

    if (props.type === 'column') {
      viewportAreaInput.classList.add(this.classViewportAreaInputColumn);
      viewportAreaInput.setAttribute(this.attrDataColStart, props.dataColumnRowStart);
    } else { // === row
      viewportAreaInput.classList.add(this.classViewportAreaInputRow);
      viewportAreaInput.setAttribute(this.attrDataRowStart, props.dataColumnRowStart);
    }

    return viewportAreaInput;
  }

  createViewportArea(dataColStart, dataRowStart) {

    const viewportArea = document.createElement('div');
    viewportArea.classList.add(this.classViewportArea);
    viewportArea.style.gridArea = this.getStyleGridArea(dataRowStart, dataColStart, dataRowStart + 1, dataColStart + 1);
    viewportArea.setAttribute(this.attrDataColStart, dataColStart);
    viewportArea.setAttribute(this.attrDataRowStart, dataRowStart);

    return viewportArea;
  }

  createViewportAreas(preset = null) {

    //////////
    // Setup

    // Reset variables
    this.viewportAreas = [];
    this.gridTemplateColumns = {};
    this.gridTemplateRows = {};
    this.gap = 0;

    // Clear viewport
    this.viewportGrid.getViewportDesktop().innerHTML = '';

    // Set default grid-template style
    if (preset) {
      this.gridTemplateColumns.styleSplit = preset.parent.gridTemplateColumns.styleSplit;
      this.gridTemplateRows.styleSplit = preset.parent.gridTemplateRows.styleSplit;
    } else {
      this.gridTemplateColumns.styleSplit = 'repeat(3, 1fr);';
      this.gridTemplateRows.styleSplit = 'repeat(3, 1fr);';
    }

    //////////

    // Add grid-template-columns to this.viewportGrid
    this.parseGridTemplateStyle('column', this.gridTemplateColumns);
    this.viewportGrid.getViewportDesktop().style.gridTemplateColumns = this.gridTemplateColumns.styleExtended;

    // Add grid-template-rows to this.viewportGrid
    this.parseGridTemplateStyle('row', this.gridTemplateRows);
    this.viewportGrid.getViewportDesktop().style.gridTemplateRows = this.gridTemplateRows.styleExtended;

    // Add gap to this.viewportGrid
    this.viewportGrid.getViewportDesktop().style.gap = this.gap;

    // Actions
    Actions.updateGridTemplateColumns(this.gridTemplateColumns);
    Actions.updateGridTemplateRows(this.gridTemplateRows);

    Actions.updateColumnGap(this.parseGapValues(this.gap));
    Actions.updateRowGap(this.parseGapValues(this.gap));

    // Add viewportAreas to this.viewportGrid
    let iCols = 1;
    let iRows = 1;
    let totalAreas = this.gridTemplateColumns.total * this.gridTemplateRows.total;
    for (let i = 0; i < totalAreas; i++) {

      let viewportArea = this.createViewportArea(iCols, iRows);

      this.viewportGrid.getViewportDesktop().append(viewportArea);

      // Add columns's input
      if (i < this.gridTemplateColumns.total) {
        let input = this.createViewportAreaInput({
          type: 'column',
          value: this.gridTemplateColumns.styleArray[i],
          dataColumnRowStart: iCols
        });
        viewportArea.append(input);
      }

      // Add rows's input
      if (Number.isInteger( i / this.gridTemplateColumns.total ) ) {
        let input = this.createViewportAreaInput({
          type: 'row',
          value: this.gridTemplateRows.styleArray[i / this.gridTemplateColumns.total],
          dataColumnRowStart: iRows
        });
        viewportArea.append(input);
      }

      this.viewportAreas.push(viewportArea);

      if (iCols / this.gridTemplateColumns.total === 1) {
        iCols = 0;
        iRows++;
      }
      iCols++;
    }

    this.viewportAreaInputOnBlurUpdateAreas();

  }

  viewportAreaInputOnBlurUpdateAreas() {

    this.viewport.getViewport().addEventListener('blur', (e) => {

      let input = e.target;
      if (input.classList.contains(this.classViewportAreaInput)) {

        // Check areaInputs's value
        let viewportAreaInput = this.parseViewportAreaInputs();
        if (!viewportAreaInput) {
          return alert('Please add a number with fr, px, or %');
        }

        // Update viewport's style grid-template columns and rows

        if (input.hasAttribute(this.attrDataColStart)) {
          this.gridTemplateColumns.styleArray[input.getAttribute(this.attrDataColStart) - 1] = input.value;
          this.parseGridTemplateStyle('column', this.gridTemplateColumns);
          this.viewportGrid.getViewportDesktop().style.gridTemplateColumns = this.gridTemplateColumns.styleExtended;
        }

        if (input.hasAttribute(this.attrDataRowStart)) {
          this.gridTemplateRows.styleArray[input.getAttribute(this.attrDataRowStart) - 1] = input.value;
          this.parseGridTemplateStyle('row', this.gridTemplateRows);
          this.viewportGrid.getViewportDesktop().style.gridTemplateRows = this.gridTemplateRows.styleExtended;
        }

      }

    }, true);

  }

  parseGapValues(value) {
    return {
      number: Number(value),
      string: Number(value) + 'px'
    }
  }

  parseGridTemplateStyle(columnRow, gridTemplateColumnRows) {

    let allStyles = {};
    let styleExtended = '';
    let styleRepeat = '';
    let styleSplit = '';
    let styleSplitArray = [];
    let styleArray = [];
    let total = 0;

    if (gridTemplateColumnRows.styleArray) {
      gridTemplateColumnRows.styleArray.forEach(columnRow => {
        styleSplit += columnRow + ';';
      })
      gridTemplateColumnRows.styleSplit = styleSplit;
    }

    styleSplitArray = gridTemplateColumnRows.styleSplit
      .replace(/ /g,'')
      .replace(/,/g,', ')
      .replace(/;$/,'')
      .split(';');

    styleSplit = '';

    // Set styleArray && styleSplit
    styleSplitArray.forEach(columnRow => {

      let columnRowData = this.parseStyleGridTemplateDataByType(columnRow);
      if (columnRowData.type === 'repeat') {
        for (let i = 0; i < columnRowData.amount; i++) {
          styleArray.push(columnRowData.value);
          styleExtended += columnRowData.value + ' ';
          styleSplit += columnRowData.value + ';';
          total++;
        }
      } else
      if (columnRowData.type === 'fr|px|%') {
        styleArray.push(columnRow);
        styleExtended += columnRow + ' ';
        styleSplit += columnRow + ';';
        total++;
      }

    });

    // Set styleExtended
    styleExtended = styleExtended.trim();
    styleExtended = styleExtended.trim();
    styleSplit = styleSplit.trim();

    // Set styleRepeat
    let uniqueStyles = new Set(styleArray); // Isolate different values
    uniqueStyles.forEach(uniqueStyle => {
      let uniqueUnited = styleArray.filter((style) => {
        return style === uniqueStyle;
      });

      if (uniqueUnited.length > 1) {
        styleRepeat += `repeat(${uniqueUnited.length}, ${uniqueStyle}) `;
      } else {
        styleRepeat += uniqueStyle;
      }
    });

    allStyles = {
      type: columnRow,
      styleExtended,
      styleRepeat,
      styleSplit,
      styleArray,
      total
    }

    switch (columnRow) {
      case 'column':
        this.gridTemplateColumns = allStyles;
        Actions.updateGridTemplateColumns(allStyles);
      break;
      case 'row':
        this.gridTemplateRows = allStyles;
        Actions.updateGridTemplateRows(allStyles);
      break;
    }
  }

  parseViewportAreaInputs() {

    let viewportAreaInputColumn = this.getViewportAreaInputColumn(),
        viewportAreaInputRow = this.getViewportAreaInputRow(),
        viewportAreaInput = [
          ...viewportAreaInputColumn,
          ...viewportAreaInputRow
        ];

    // Check if the values are OK
    for (let i = 0; i < viewportAreaInput.length; i++) {
      if (!viewportAreaInput[i].value.match(/^[0-9]/) ||
          !viewportAreaInput[i].value.match(/(fr|px|%)$/)) {
        return false;
      }
    }

    return {
      viewportAreaInputColumn,
      viewportAreaInputRow
    };
  }

  parseStyleGridTemplateDataByType(item) {
    if (item.match(/repeat/)) {
      return {
        item,
        type: 'repeat',
        amount: Number(item.match(/\([0-9]*,/)[0].replace(/\(|,/g,'')),
        value: item.match(/,.*\)/)[0].replace(/,| |\)/g, '')
      }
    } else
    if (item.match(/fr|px|%/)) {
      return {
        item,
        type: 'fr|px|%',
        amount: 1,
        value: item
      }
    } else {
      alert(new Error('Please define columns and rows correctly.'));
    }
  }

  render() {
    this.createViewportAreas();
  }

}

export default ViewportArea;