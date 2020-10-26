import Control from './control.js';

class ControlHeading {

  constructor() {
    this.control = new Control();

    this.classControlLogo = 'control__logo';
    this.classControlSubtitle = 'control__subtitle';
  }

  createLogo() {
    let logo = document.createElement('h1');
    logo.classList.add(this.classControlLogo);
    logo.innerHTML = 'As One';
    this.control.getControl().append(logo);
  }

  createSubtitle() {
    let subtitle = document.createElement('h1');
    subtitle.classList.add(this.classControlSubtitle);
    subtitle.innerHTML = 'Toolbox Grid';
    this.control.getControl().append(subtitle);
  }

  render() {
    this.createLogo();
    this.createSubtitle();
  }

}

export default ControlHeading;