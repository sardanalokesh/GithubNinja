angular.module('ghtrending.services')
	.factory('repositories', function($q, $http) {

    var ROOT_API = "api.github.com";
    var REPO_SEARCH = ROOT_API + "/search/repositories";
  
    function processAjaxRequest(url) {
        var deffered=$q.defer();
        $http({
            method: "get",
            url: url,
            headers: {

            },

        }).success(function(data) {
            if (data) {
                deffered.resolve(data);
            } else {

            }
        }).error(function(error) {
            deffered.reject(error);
        });
        return deffered.promise;
    }

    return {
        getPopularRepositories: function(timeScale) {
            var url = REPO_SEARCH;
            var searchDate = new Date();
            if (timeScale == "weekly")
              searchDate.setDate(searchDate.getDate() - 7);
            else if (timeScale == "monthly")
              searchDate.setMonth(searchDate.getMonth() - 1);
            else if (timeScale == "yearly")
              searchDate.setYear(searchDate.getYear() - 1);
            var query = "pushed:>" + searchDate.toISOString();
            url += "?q="+query+"&sort=stars&order=desc";
            return processAjaxRequest(url);
        }
    };
});