import Control from '../control/control.js';
import ViewportArea from '../viewport/viewport__area.js';
import ViewportDesktop from '../viewport/viewport__grid.js';
import ViewportUserElement from '../viewport/viewport__user-element.js';

import allPresets from './preset-all.js';

class Preset {

  constructor() {
    this.control = new Control();
    this.viewportArea = new ViewportArea();
    this.viewportGrid = new ViewportDesktop();
    this.viewportUserElement = new ViewportUserElement();

    this.classPreset = 'preset';
  }

  createPreset(value, name) {
    const preset = document.createElement('button');
    preset.classList.add(this.classPreset);
    preset.innerHTML = name;
    preset.dataset.preset = value;
    this.control.getControl().append(preset);
  }

  createPresets() {
    let presets = this.getPresets();
    for (let preset in presets) {
      this.createPreset(preset, presets[preset].name);
    }

    this.onClickUpdateViewportArea();
  }

  getPresets(preset = null) {
    let presets = allPresets;
    if (preset) {
      return presets[preset];
    } else {
      return presets;
    }
  }

  onClickUpdateViewportArea() {

    this.control.getControl().addEventListener('click', (e) => {
      if (e.target.classList.contains(this.classPreset)) {

        if ( confirm('This will change the grid. Do you confirm?') ) {

          let preset = this.getPresets(e.target.dataset.preset);
          this.viewportArea.createViewportAreas(preset);

          preset.children.forEach(child => {
            this.viewportUserElement.createUserElement({
              parent: this.viewportGrid.getViewportDesktop(),
              name: child.name,
              gridArea: child.gridArea,
              input: false
            });
          })

        }
      }
    });

  }

  render() {
    this.createPresets();
  }

}

export default Preset;