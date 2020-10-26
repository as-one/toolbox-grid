import ViewportArea from './viewport__area.js';
import ViewportBtn from './viewport__btn.js';
import ViewportDesktop from './viewport__grid.js';
import ViewportUserElement from './viewport__user-element.js';

class Viewport {

  constructor() {
    this.classViewport = 'viewport';
  }

  createViewport() {
    const viewport = document.createElement('div');
    viewport.classList.add(this.classViewport);
    document.body.append(viewport);
  }

  getViewport() {
    return document.querySelector(`.${this.classViewport}`);
  }

  render() {
    this.createViewport();

    const viewportGrid = new ViewportDesktop();
    viewportGrid.render();

    const viewportArea = new ViewportArea();
    viewportArea.render();

    const viewportUserElement = new ViewportUserElement();
    viewportUserElement.render();

    const viewportBtn = new ViewportBtn();
    viewportBtn.render();
  }

}

export default Viewport;