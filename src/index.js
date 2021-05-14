const PlatformVisitor =  require('./PlatformVisitor')
const validateOptions = require('./validateOptions')

const defaultOptions = {
  reg: /\/\*\s+#(\w+)\s+(?:(\w+)\s+)?\*\//
}

class LessPluginPlatform {
  constructor(options) {
    validateOptions(options);
    this.options = Object.assign({}, defaultOptions, options)
  }

  /* Called immediately after the plugin is 
   * first imported, only once. */
  install(less, pluginManager, functions) {
    pluginManager.addVisitor(new PlatformVisitor(less, this.options));
  }

  /* Called for each instance of your @plugin. */
  use(context) { }

  /* Called for each instance of your @plugin, 
   * when rules are being evaluated.
   * It's just later in the evaluation lifecycle */
  eval(context) { }

  /* Passes an arbitrary string to your plugin 
   * e.g. @plugin (args) "file";
   * This string is not parsed for you, 
   * so it can contain (almost) anything */
  setOptions(argumentString) { }

  /* Set a minimum Less compatibility string
   * You can also use an array, as in [3, 0] */
  get minVersion() { 
    return ['3.0']
  }

  /* Used for lessc only, to explain 
   * options in a Terminal */
  printUsage() { }
}

module.exports = LessPluginPlatform