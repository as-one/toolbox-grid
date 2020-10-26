import CliCss from './cli__css.js';
import CliHtml from './cli__html.js';
import Store from '../../data/store.js';

class Cli {

  constructor() {
    this.classCli = 'cli';
  }

  getCli() {
    return document.querySelector(`.${this.classCli}`)
  }

  setCli() {
    let cliHtml = new CliHtml();
    let cliCss = new CliCss();

    // TODO Promise
    setTimeout(() => {
      cliHtml.setCliHtml();
      cliCss.setCliCss();
    }, 100);
  }

  createCli() {
    const cli = document.createElement('div');
    cli.classList.add(this.classCli);
    document.body.append(cli);
  }

  getPrefix() {
    if (Store.getState().prefix) {
      return 'as-one__';
    } else {
      return '';
    }
  }

  parseName(name) {
    let newName = name.toLowerCase().replace(/ /g, '-').replace(/\./g, '');
    return {
      raw: newName,
      class: `.${newName}`
    }
  }

  render() {
    this.createCli();

    const cliHtml = new CliHtml();
    cliHtml.render();

    const cliCss = new CliCss();
    cliCss.render();
  }

}

export default Cli;