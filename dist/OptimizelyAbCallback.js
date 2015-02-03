/*global window:false, document:false */
(function(window, document, undefined) {

  "use strict";


/* OptimizelyAbCallback main */

var _OptimizelyAbCallback = function() {
  this.experiments = {};
  this.initialized = false;
};

_OptimizelyAbCallback.prototype.includeABScript = function(optimizelyId){
  var g = document.createElement("script"),
      s = document.getElementsByTagName("script")[0];
  g.src = '//cdn.optimizely.com/js/' + optimizelyId + '.js';
  g.async = true;
  s.parentNode.insertBefore(g, s);
};

_OptimizelyAbCallback.prototype.init = function() {
  if (this.initialized) {
    return;
  }

  this.initialized = true;

  window._optiab = window._optiab || [];

  var len = window.optimizely.data.state.activeExperiments.length,
      that = this, i, experimentID, variation;

  for(i = 0; i < len; i++){
    experimentID = window.optimizely.data.state.activeExperiments[i];
    variation = window.optimizely.data.state.variationNamesMap[experimentID] || 'Original';
    variation = variation.toLowerCase().replace(' ','-').replace('#','');
    this.experiments[experimentID] = variation;
  }

  for(i = 0; i < window._optiab.length; i++){
    this._callHome(window._optiab.shift());
  }

  window._optiab.push = function(args) {
    that._callHome.apply(that, [args]);
  };

};

_OptimizelyAbCallback.prototype.addExperimentClass = function(experimentID, variation) {
  var result = " ab-" + experimentID + "-" + variation;
  if (document.documentElement.className.indexOf(result) === -1) {
    document.documentElement.className += " ab-" + experimentID + "-" + variation;
  }
};

_OptimizelyAbCallback.prototype._callHome = function(param) {
  var variation = 'original';

  if (param.length < 2 || typeof param[1] != 'function') {
    return;
  }
  if (this.experiments[param[0]] !== undefined) {
    variation = this.experiments[param[0]];
  }
  this.addExperimentClass(param[0], variation);
  param[1](variation);
};

window.OptimizelyAbCallback = new _OptimizelyAbCallback();


}(window, document));
