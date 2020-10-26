import Base from './base/base.js';
import Cli from './views/cli/cli.js';
import Control from './views/control/control.js';
import Preset from './views/preset/preset.js';
import Store from './data/store.js';
import Viewport from './views/viewport/viewport.js';

Store.create();

const base = new Base();
base.execute();

const viewport = new Viewport();
viewport.render();

const control = new Control();
control.render();

const cli = new Cli();
cli.render();

const preset = new Preset();
preset.render();