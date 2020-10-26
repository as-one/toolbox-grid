import Cli from './cli.js';
import ViewportUserElement from '../viewport/viewport__user-element.js';

class CliHtml {

  constructor() {
    this.cli = new Cli();
    this.viewportUserElement = new ViewportUserElement();

    this.classCliHtml = 'cli__html';
  }

  getCliHtml() {
    return document.querySelector(`.${this.classCliHtml}`);
  }

  setCliHtml() {
    let grid = document.createElement('div');
    grid.classList.add(this.cli.getPrefix() + 'grid');

    this.viewportUserElement.getViewportUserElements().forEach(userElement => {
      let newEl = document.createElement('div');

      let name = userElement.querySelector(`.${this.viewportUserElement.classViewportUserElementName}`);
      name = this.cli.parseName(name.innerHTML);
      newEl.classList.add(name.raw);

      grid.append(newEl);
    });

    if (this.getCliHtml()) {
      this.getCliHtml().innerHTML = '';
      this.getCliHtml().append(grid.outerHTML);
    }
  }

  createCliHtml() {
    const html = document.createElement('div');
    html.classList.add(this.classCliHtml);
    this.cli.getCli().append(html);

    this.setCliHtml();
  }

  render() {
    this.createCliHtml();
  }

}

export default CliHtml;