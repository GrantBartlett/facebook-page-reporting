'use strict';

// Facebook controller
angular.module('Core').controller('OrganicPosts', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$facebook',
    function ($rootScope, $scope, $state, $stateParams, $http, $facebook) {

        $scope.getPosts = function () {
            if ($rootScope.fbReady) {
                var page = $scope.response.brand;

                //var page = 186451331430379;

                $facebook.api(
                    '/' + page + '/feed',
                    'GET',
                    {"fields": "promotion_status,comments{comment_count},shares,insights, full_picture"}
                ).then(function (response) {
                        fetchInsights(response.data);
                    }
                );
            }
        };


        /***
         * Fetch specific Facebook Insights
         * @param data
         */
        var fetchInsights = function (data) {
            var postArr = [];

            data.forEach(function (value, key) {
                postArr.push(value);
            });

            data.forEach(function (value, key) {
                value.insights.data.forEach(function (v, k) {

                    switch (value.insights.data[k].name) {
                        case 'post_story_adds_by_action_type' :
                            // "Lifetime: The number of stories created about your Page post, by action type. (Total No)"
                            value.actions = value.insights.data[k].values[0].value;
                            break;

                        case 'post_consumptions' :
                            // "Lifetime: The number of clicks anywhere in your post. (Total No.)"
                            value.actions.clicks = value.insights.data[k].values[0].value;
                            break;
                    }
                });
            });

            generatePostScores(postArr);
        };

        /***
         * Generate Post Scores
         * @param data
         */
        var generatePostScores = function (data) {
            // Place post scores into a usable array
            var organicScores = [];

            data.forEach(function (value, key) {
                organicScores.push(value);
            });

            // Score accordingly
            organicScores.forEach(function (value, key) {
                value.scores =
                {
                    comment: value.actions.comment * 4 | 0,
                    like: value.actions.like * 2 | 0,
                    share: value.actions.share * 8 | 0,
                    clicks: value.actions.clicks + 1 | 0
                };
                value.total = _.sum(value.scores)
            });

            $scope.bestOrganicPosts = _.sortByOrder(organicScores, ['total'], ['desc']);
            console.log(_.sortByOrder(organicScores, ['total'], ['desc']));
        };
    }
]);