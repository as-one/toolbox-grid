import Cli from './cli.js';
import Store from '../../data/store.js';
import ViewportUserElement from '../viewport/viewport__user-element.js';

class CliCss {

  constructor() {
    this.cli = new Cli();
    this.viewportUserElement = new ViewportUserElement();

    this.classCliCss = 'cli__css';
  }

  getCliCss() {
    return document.querySelector(`.${this.classCliCss}`);
  }

  setCliCss() {
    let style =
      `.${this.cli.getPrefix()}grid {
        display: grid;
        ${this.getStyleGridTemplate()}
        ${this.getStyleGap()}
        ${this.getPlaceItems()}
      } `;

    this.viewportUserElement.getViewportUserElements().forEach(userElement => {
      let name = userElement.querySelector(`.${this.viewportUserElement.classViewportUserElementName}`);
      name = this.cli.parseName(name.innerHTML);

      style +=
        `.${this.cli.getPrefix()}${name.raw} {
          ${this.getStyleGridArea(userElement.style)}
        } `;
    });

    if (this.getCliCss()) {
      this.getCliCss().innerHTML = '';
      this.getCliCss().append(style);
    }
  }

  createCliCss() {
    const cliCss = document.createElement('div');
    cliCss.classList.add(this.classCliCss);
    this.cli.getCli().append(cliCss);

    this.setCliCss();
  }

  getStyleGridTemplate() {
    let columns = '';
    let rows = '';

    if (Store.getState().shorthand) {
      columns = Store.getState().gridTemplateColumns.styleRepeat;
      rows = Store.getState().gridTemplateRows.styleRepeat;

      return `grid-template: ${rows} / ${columns};`;
    } else {
      columns = Store.getState().gridTemplateColumns.styleExtended;
      rows = Store.getState().gridTemplateRows.styleExtended;

      return `
        grid-template-columns: ${columns};
        grid-template-rows: ${rows};
      `;
    }
  }

  getStyleGap() {

    if (Store.getState().shorthand) {
      return `gap: ${Store.getState().rowGap}px ${Store.getState().columnGap}px;`;
    } else {
      return `
        gap-column: ${Store.getState().columnGap}px;
        gap-row: ${Store.getState().rowGap}px;
      `;
    }
  }

  getStyleGridArea(style) {
    if (Store.getState().shorthand) {
      return `grid-area: ${style.gridArea};`;
    } else {
      return `
        grid-row-start: ${style.gridRowStart};
        grid-column-start: ${style.gridColumnStart};
        grid-row-end: ${style.gridRowEnd};
        grid-column-end: ${style.gridColumnEnd};
      `;
    }
  }

  getPlaceItems() {

    let _return = '';

    if (Store.getState().alignItems || Store.getState().justifyItems) {

      if (
        Store.getState().shorthand &&
        Store.getState().alignItems &&
        Store.getState().justifyItems
      ) {
        _return += `place-items: ${Store.getState().alignItems} / ${Store.getState().justifyItems}; `;
      } else {

        if (
          // !Store.getState().shorthand &&
          Store.getState().alignItems
        ) {
          _return += `align-items: ${Store.getState().alignItems}; `;
        }

        if (
          // !Store.getState().shorthand &&
          Store.getState().justifyItems
        ) {
          _return += `justify-items: ${Store.getState().justifyItems}; `;
        }

      }

    } else {
      _return = '';
    }

    return _return;
  }

  render() {
    this.createCliCss();
  }

}

export default CliCss;