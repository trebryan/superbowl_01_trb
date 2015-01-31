//Define an angular module for our app
var app = angular.module('regApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngToast',
     'ngSanitize' ]);

angular
  .module('regApp')
  .config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      maxNumber: 3
    });
  }]);

/*
 *
 * Some convenience methods for arrays
 *
 */


Array.prototype.clear = function() {
  while (this.length > 0) {
    this.pop();
  }
};

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

Array.prototype.remove = function(obj) {
    var i = this.indexOf(obj);
    if (i != -1) {
        this.splice(i, 1);
    }
};




