const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__filename, '..', 'res.less');

(function(exports) {
  var preProcessor = function() {};

  preProcessor.prototype = {
      process : function (src, extra) {
        fs.appendFileSync(filePath, src)
        return src;
      }
  };

  exports.install = function(less, pluginManager) {
      pluginManager.addPreProcessor( new preProcessor() );
  };

})(typeof exports === 'undefined' ? this['preProcessorPlugin'] = {} : exports);