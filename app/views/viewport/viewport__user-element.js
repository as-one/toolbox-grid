import Cli from '../cli/cli.js';
import ViewportArea from './viewport__area.js';
import ViewportDesktop from './viewport__grid.js';

class ViewportUserElement {

  constructor() {
    this.cli = new Cli();
    this.viewportArea = new ViewportArea();
    this.viewportGrid = new ViewportDesktop();

    this.classViewportSelector = 'viewport__selector';
    this.classViewportUserElement = 'viewport__user-element';
    this.classViewportUserElementInputName = 'viewport__user-element-input-name';
    this.classViewportUserElementName = 'viewport__user-element-name';
    this.classViewportUserElementRemove = 'viewport__user-element-remove';

    this.selector;
    this.mouseDown;
    this.starterArea;
    this.starterGridColumnStart;
    this.starterGridColumnEnd;
    this.starterGridRowStart;
    this.starterGridRowEnd;
  }

  getViewportUserElements() {
    return document.querySelectorAll(`.${this.classViewportUserElement}`);
  }

  getStarterArea(element) {

    if (element.target.classList.contains(this.viewportArea.classViewportArea)) {
      // area without user element
      this.starterArea = element.target;
    } else {
      // area with user element
      this.starterArea = document.querySelector(`.${this.viewportArea.classViewportArea}[data-col-start="${element.target.style.gridColumnStart}"][data-row-start="${element.target.style.gridRowStart}"]`);
    }

    return this.starterArea;
  }

  createUserElement(props) {

    // Colors
    // let colors = [
    //   'rgba(255, 34, 34, 0.5)', // red
    //   'rgba(255, 34, 255, 0.5)', // orange
    //   'rgba(34, 34, 255, 0.5)', // yellow
    //   'rgba(34, 255, 255, 0.5)', // green
    //   'rgba(34, 255, 34, 0.5)', // cyan
    //   'rgba(255, 255, 34, 0.5)', // blue
    //   'rgba(255, 34, 34, 0.5)' // violet
    // ];
    let colors = [
      // 'rgb(255,0,84)', // pink
      // 'rgb(247,223,46)' // yellow
    ];

    // Set user element (parent)
    let userElement = document.createElement('div');
    userElement.classList.add(this.classViewportUserElement);
    userElement.style.gridArea = props.gridArea;
    // userElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    // userElement.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
    props.parent.append(userElement);

    /////////
    // Set name and input name
    let nameValue;
    if (props.name) {
      nameValue = props.name;
    } else {
      let sequentialNumber =  this.getViewportUserElements().length;
      nameValue = 'div-' + sequentialNumber;
    }

    // Set name
    let name = document.createElement('span');
    name.classList.add(this.classViewportUserElementName);
    name.innerHTML = nameValue;

    if (props.input) {
      name.style.display = 'none';
    }

    userElement.append(name);

    // Set input
    let inputName = document.createElement('input');
    inputName.classList.add(this.classViewportUserElementInputName);
    userElement.append(inputName);
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('value', nameValue);
    inputName.select();

    if (!props.input) {
      inputName.style.display = 'none';
    }

    /////////
    // Set button remove
    let btnRemove = document.createElement('button');
    btnRemove.classList.add(this.classViewportUserElementRemove);
    btnRemove.innerHTML = '×';
    userElement.append(btnRemove);

    return userElement;
  }

  onMouseDownAddSelector() {

    let onMouseAddSelector = (e) => {

      this.mouseDown = true;

      this.selector?.remove();

      let clickedIsArea = e.target.classList.contains(this.viewportArea.classViewportArea);
      let clickedIsUserElement = e.target.classList.contains(this.classViewportUserElement);
      if (clickedIsArea ||
          clickedIsUserElement
      ) {

        this.starterArea = this.getStarterArea(e);

        // Set globals
        this.starterGridColumnStart = this.starterArea.style.gridColumnStart;
        this.starterGridColumnEnd = this.starterArea.style.gridColumnEnd;
        this.starterGridRowStart = this.starterArea.style.gridRowStart;
        this.starterGridRowEnd = this.starterArea.style.gridRowEnd;

        this.selector = document.createElement('div');
        this.selector.classList.add(this.classViewportSelector);
        this.selector.style.gridArea = this.viewportArea.getStyleGridArea(
          this.starterGridRowStart,
          this.starterGridColumnStart,
          this.starterGridRowEnd,
          this.starterGridColumnEnd);
        e.target.parentElement.append(this.selector);
      }

    };

    this.viewportGrid.getViewportDesktop().addEventListener('mousedown', onMouseAddSelector.bind(this));

  }

  onMouseUpRemoveSelectorAddUserElement() {

    let onMouseUpRemoveSelectorAddUserElement = (e) => {

      // If click is on name, prevent
      if (e.target.classList.contains(this.classViewportUserElementName) ||
          e.target.classList.contains(this.classViewportUserElementInputName)
      ) {
        return;
      }

      this.mouseDown = false;

      if (this.selector) {

        this.createUserElement({
          parent: e.target.parentElement,
          gridArea: this.selector.style.gridArea,
          input: true
        });

      }

      this.selector.remove();

      this.cli.setCli();
    }

    this.viewportGrid.getViewportDesktop().addEventListener('mouseup', onMouseUpRemoveSelectorAddUserElement.bind(this), true);

  }

  onMouseEnterIncreaseSelectorArea() {

    this.viewportGrid.getViewportDesktop().addEventListener('mouseenter', (e) => {

      if (this.mouseDown) {

        // Update

        // Column start
        if ( Number(this.starterArea.style.gridColumnStart) > Number(e.target.style.gridColumnStart) ) {
          this.selector.style.gridColumnStart = e.target.style.gridColumnStart;
        }

        // Row start
        if ( Number(this.starterArea.style.gridRowStart) > Number(e.target.style.gridRowStart) ) {
          this.selector.style.gridRowStart = e.target.style.gridRowStart;
        }

        // Column end
        if ( Number(this.starterArea.style.gridColumnEnd) < Number(e.target.style.gridColumnEnd) ) {
          this.selector.style.gridColumnEnd = e.target.style.gridColumnEnd;
        }

        // Row end
        if ( Number(this.starterArea.style.gridRowEnd) < Number(e.target.style.gridRowEnd) ) {
          this.selector.style.gridRowEnd = e.target.style.gridRowEnd;
        }

        // Revert

        // Column start
        if ( Number(this.starterGridColumnStart) === Number(e.target.style.gridColumnStart) ) {
          this.selector.style.gridColumnStart = e.target.style.gridColumnStart;
        }

        // Row start
        if ( Number(this.starterGridRowStart) === Number(e.target.style.gridRowStart) ) {
          this.selector.style.gridRowStart = e.target.style.gridRowStart;
        }

        // Column end
        if ( Number(this.starterGridColumnEnd) === Number(e.target.style.gridColumnEnd) ) {
          this.selector.style.gridColumnEnd = e.target.style.gridColumnEnd;
        }

        // Row end
        if ( Number(this.starterGridRowEnd) === Number(e.target.style.gridRowEnd) ) {
          this.selector.style.gridRowEnd = e.target.style.gridRowEnd;
        }
      }

    }, true);

  }

  onClickUserElementRemove() {

    this.viewportGrid.getViewportDesktop().addEventListener('click', (e) => {
      if (e.target.classList.contains(this.classViewportUserElementRemove)) {
        e.target.parentElement.remove();

        let viewportUserElementAll = this.getViewportUserElements();
        for (let i = 0; i < viewportUserElementAll.length; i++) {
          let viewportUserElementName = viewportUserElementAll[i].querySelector(`.${this.classViewportUserElementName}`);
          if (viewportUserElementName.innerHTML.match(/^div-[0-9]*/)) {
            viewportUserElementName.innerHTML = 'div-' + (i + 1);
          }
        }
      }
    });

  }

  onClickUserElementName() {

    this.viewportGrid.getViewportDesktop().addEventListener('click', (e) => {
      if (e.target.classList.contains(this.classViewportUserElementName)) {

        let inputName = e.target.parentElement.querySelector(`.${this.classViewportUserElementInputName}`);
        inputName.setAttribute('value', e.target.innerHTML);
        inputName.style.display = 'initial';
        inputName.select();

        // Hide name
        e.target.style.display = 'none';
      }
    });

  }

  onKeyEnterUserElementInputName() {

    this.viewportGrid.getViewportDesktop().addEventListener('keydown', (e) => {
      if (
        e.target.classList.contains(this.classViewportUserElementInputName) &&
        e.keyCode === 13 // enter
      ) {

        this.updateNameFromInputName(e.target);

      }
    });

  }

  onBlurUpdateNameFromInputName() {

    this.viewportGrid.getViewportDesktop().addEventListener('blur', (e) => {
      if (e.target.classList.contains(this.classViewportUserElementInputName)) {

        this.updateNameFromInputName(e.target);

      }
    }, true);

  }

  updateNameFromInputName(inputName) {

    if (!inputName.value) {
      alert("Name can't be empty.");
      inputName.value = 'div';
    }

    let classViewportUserElementNameSibling = inputName.parentElement.querySelector(`.${this.classViewportUserElementName}`);
    classViewportUserElementNameSibling.innerHTML = this.cli.parseName(inputName.value).class;
    classViewportUserElementNameSibling.style.display = 'initial';

    // Hide input
    inputName.style.display = 'none';

    this.cli.setCli();
  }

  render() {
    this.onMouseDownAddSelector();
    this.onMouseUpRemoveSelectorAddUserElement();
    this.onClickUserElementRemove();
    this.onMouseEnterIncreaseSelectorArea();
    this.onClickUserElementName();
    this.onKeyEnterUserElementInputName();
    this.onBlurUpdateNameFromInputName();
  }

}

export default ViewportUserElement;