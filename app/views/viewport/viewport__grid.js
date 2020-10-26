import Viewport from './viewport.js';

class ViewportDesktop {

  constructor() {
    this.viewport = new Viewport();

    this.classViewportDesktop = 'viewport__grid';
  }

  getViewportDesktop() {
    return document.querySelector(`.${this.classViewportDesktop}`);
  }

  createViewportDesktop() {
    const viewportGrid = document.createElement('div');
    viewportGrid.classList.add(this.classViewportDesktop);
    this.viewport.getViewport().append(viewportGrid);
  }

  render() {
    this.createViewportDesktop();
  }

}

export default ViewportDesktop;