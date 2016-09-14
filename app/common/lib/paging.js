angular.module("myApp")

.constant('pagexConfig', {
    visiblePageCount: 10,
    firstText: 'First',
    lastText: 'Last',
    prevText: 'Previous',
    nextText: 'Next'
})

.directive("pager", ['pagexConfig', function(pagexConfig) {
    return {
        link: function(scope, element, attrs) {
            var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : pagexConfig.visiblePageCount;
            scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : pagexConfig.firstText;
            scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : pagexConfig.lastText;
            scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : pagexConfig.prevText;
            scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : pagexConfig.nextText;
            scope.currentPage = 1;
            scope.pageChange = function(page) {
                if (page >= 1 && page <= scope.pageCount) {
                    scope.currentPage = page;
                } else {
                    scope.currentPage = 1;
                }
            }

            function build() {
                var low,
                    high,
                    v;
                scope.pagenums = [];
                if (scope.pageCount == 0) {
                    return;
                }
                if (scope.currentPage > scope.pageCount) {
                    scope.currentPage = 1;
                }
                if (scope.pageCount <= visiblePageCount) {
                    low = 1;
                    high = scope.pageCount;
                } else {
                    v = Math.ceil(visiblePageCount / 2);
                    low = Math.max(scope.currentPage - v, 1);
                    high = Math.min(low + visiblePageCount - 1, scope.pageCount);
                    if (scope.pageCount - high < v) {
                        low = high - visiblePageCount + 1;
                    }
                }
                for (; low <= high; low++) {
                    scope.pagenums.push(low);
                }
                scope.onPageChange();
            }
            scope.$watch('currentPage+pageCount', function() {
                build();
            });
        },
        replace: true,
        restrict: "E",
        scope: {
            pageCount: '=',
            currentPage: '=',
            onPageChange: '&'
        },
        template: '<ul class="pagination"><li ng-click="pageChange(1)">{{firstText}}</li>' +
                  '<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' +
                  '<li ng-repeat="pagenum in pagenums" ng-click="pageChange(pagenum)" ng-class="{active:currentPage===pagenum}">{{pagenum}}</li>' +
                  '<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)">{{nextText}}</li>' +
                  '<li ng-click="pageChange(pageCount)">{{lastText}}</li></ul>'
    }
}]);
