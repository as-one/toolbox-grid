import Actions from '../../data/actions.js';
import Control from './control.js';
import ControlPlaceItems from './control__place-items.js';
import ControlPrefix from './control__prefix.js';
import ControlShorthand from './control__shorthand.js';
import ViewportArea from '../viewport/viewport__area.js';

class ControlLink {

  constructor() {
    this.control = new Control();

    this.classControlLink = 'control__link';
  }

  createControlLink() {

    const link = document.createElement('a');
    link.classList.add(this.classControlLink);
    link.innerHTML = 'developed by As One';
    link.setAttribute('href', 'https://asone.studio');
    link.setAttribute('target', '_blank');
    this.control.getControl().append(link);

  }

  render() {
    this.createControlLink();
  }

}

export default ControlLink;