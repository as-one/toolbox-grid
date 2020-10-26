import Actions from '../../data/actions.js';
import Viewport from './viewport.js';
import ViewportArea from './viewport__area.js';
import ViewportDesktop from './viewport__grid.js';

class ViewportBtn {

  constructor() {
    this.viewport = new Viewport();
    this.viewportArea = new ViewportArea();
    this.viewportGrid = new ViewportDesktop();

    this.classViewportBtnAddColumn = 'viewport__btn_add-column';
    this.classViewportBtnRemoveColumn = 'viewport__btn_remove-column';
    this.classViewportBtnAddRow = 'viewport__btn_add-row';
    this.classViewportBtnRemoveRow = 'viewport__btn_remove-row';
  }

  createBtnAddColumn() {
    const btnAddColumn = document.createElement('button');
    btnAddColumn.classList.add(this.classViewportBtnAddColumn);
    btnAddColumn.innerHTML = 'Add Column';
    this.viewport.getViewport().append(btnAddColumn);

    btnAddColumn.addEventListener('click', this.setColumnOnViewport.bind(this, { action: 'add' }));
  }

  createBtnRemoveColumn() {
    const btnRemoveColumn = document.createElement('button');
    btnRemoveColumn.classList.add(this.classViewportBtnRemoveColumn);
    btnRemoveColumn.innerHTML = 'Remove Column';
    this.viewport.getViewport().append(btnRemoveColumn);

    btnRemoveColumn.addEventListener('click', this.setColumnOnViewport.bind(this, { action: 'remove' }));
  }

  createBtnAddRow() {
    const btnAddRow = document.createElement('button');
    btnAddRow.classList.add(this.classViewportBtnAddRow);
    btnAddRow.innerHTML = 'Add Row';
    this.viewport.getViewport().append(btnAddRow);

    btnAddRow.addEventListener('click', this.setRowOnViewport.bind(this, { action: 'add' }));
  }

  createBtnRemoveRow() {
    const btnRemoveRow = document.createElement('button');
    btnRemoveRow.classList.add(this.classViewportBtnRemoveRow);
    btnRemoveRow.innerHTML = 'Remove Row';
    this.viewport.getViewport().append(btnRemoveRow);

    btnRemoveRow.addEventListener('click', this.setRowOnViewport.bind(this, { action: 'remove' }));
  }

  setColumnOnViewport(options, _this) {
    let gridTemplateColumns = this.viewportArea.getGridTemplateColumns();
    let areas = this.viewportArea.getViewportAreas();

    let lastArea = areas[areas.length - 1];
    let lastColStart = lastArea.getAttribute(this.viewportArea.attrDataColStart);

    // Add or remove
    if (options.action === 'add') {

      gridTemplateColumns.styleArray.push('1fr');

      // Add new areas
      areas.forEach((area, index) => {

        let currentAttrDataColStart = Number(area.getAttribute(this.viewportArea.attrDataColStart));
        let currentAttrDataRowStart = Number(area.getAttribute(this.viewportArea.attrDataRowStart));

        let nextAttrDataColStart = Number(areas[index + 1]?.getAttribute(this.viewportArea.attrDataColStart));

        if (!nextAttrDataColStart ||
          nextAttrDataColStart <= currentAttrDataColStart
        ) {
          let newArea = this.viewportArea.createViewportArea( currentAttrDataColStart + 1, currentAttrDataRowStart );
          area.after(newArea);

          // Add input to first column
          if (Number(newArea.getAttribute(this.viewportArea.attrDataRowStart)) === 1) {
            let input = this.viewportArea.createViewportAreaInput({
              type: 'column',
              value: '1fr',
              dataColumnRowStart: Number(lastColStart) + 1
            });
            newArea.append(input);
          }
        }

      });

    } else { // === remove

      let areasArray = Array.from(areas);
      // Is there a data-col-start > 1?
      if ( !areasArray.find(area => area.getAttribute(this.viewportArea.attrDataColStart) > 1 ) ) {
        alert("Can't delete last column.")
        return;
      }

      gridTemplateColumns.styleArray.pop();

      areas.forEach(area => {
        let currentAttrDataColStart = area.getAttribute(this.viewportArea.attrDataColStart);

        if (currentAttrDataColStart === lastColStart) {
          area.remove();
        }
      })
    }

    this.viewportArea.setViewportAreas(this.viewportArea.getViewportAreas());

    this.viewportArea.setGridTemplateColumns(gridTemplateColumns);
    gridTemplateColumns = this.viewportArea.getGridTemplateColumns();
    this.viewportGrid.getViewportDesktop().style.gridTemplateColumns = gridTemplateColumns.styleExtended;

    Actions.updateGridTemplateColumns(this.viewportArea.getGridTemplateColumns());
  }

  setRowOnViewport(options, _this) {
    let gridTemplateRows = this.viewportArea.getGridTemplateRows();
    let areas = this.viewportArea.getViewportAreas();

    let lastArea = areas[areas.length - 1];
    let lastRowStart = lastArea.getAttribute(this.viewportArea.attrDataRowStart);
    let lastColStart = lastArea.getAttribute(this.viewportArea.attrDataColStart);

    // Add or remove
    if (options.action === 'add') {

      gridTemplateRows.styleArray.push('1fr');

      for (let i = 1; i <= lastColStart; i++) {
        let newArea = this.viewportArea.createViewportArea(i, Number(lastRowStart) + 1);
        this.viewportGrid.getViewportDesktop().append(newArea);

        // Add input to first row
        if (i === 1) {
          let input = this.viewportArea.createViewportAreaInput({
            type: 'row',
            value: '1fr',
            dataColumnRowStart: Number(lastRowStart) + 1
          });
          newArea.append(input);
        }
      }

    } else { // contains this.classViewportBtnRemoveRow

      let areasArray = Array.from(areas);
      // Is there a data-col-start > 1?
      if ( !areasArray.find(area => area.getAttribute(this.viewportArea.attrDataRowStart) > 1 ) ) {
        alert("Can't delete last row.")
        return;
      }

      gridTemplateRows.styleArray.pop();

      areas.forEach(area => {
        if (area.getAttribute(this.viewportArea.attrDataRowStart) == lastRowStart) {
          area.remove();
        }
      })

    }

    this.viewportArea.setViewportAreas(this.viewportArea.getViewportAreas());

    this.viewportArea.setGridTemplateRows(gridTemplateRows);
    gridTemplateRows = this.viewportArea.getGridTemplateRows();
    this.viewportGrid.getViewportDesktop().style.gridTemplateRows = gridTemplateRows.styleExtended;

    Actions.updateGridTemplateRows(this.viewportArea.getGridTemplateRows());
  }

  render() {
    this.createBtnAddColumn();
    this.createBtnRemoveColumn();
    this.createBtnAddRow();
    this.createBtnRemoveRow();
  }

}

export default ViewportBtn;