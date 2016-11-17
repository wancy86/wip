angular.module('myApp')

.directive("fakeAutocomplete", [
  function () {
    return {
      restrict: "EA",
      replace: true,
      template: "<div><input/><input type=\"password\"/></div>",
      link: function (scope, elem, attrs) {
        elem.css({
          "overflow": "hidden",
          "width": "0px",
          "height": "0px"
        });
      }
    }
  }
]);
