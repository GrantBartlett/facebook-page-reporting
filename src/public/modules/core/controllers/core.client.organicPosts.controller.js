'use strict';

// Facebook controller
angular.module('Core').controller('OrganicPosts', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$facebook',
    function ($rootScope, $scope, $state, $stateParams, $http, $facebook) {

        $scope.getPosts = function () {
            if ($rootScope.fbReady) {
                var page = $scope.response.brand;

                $facebook.api(
                    '/' + page + '/feed',
                    'GET',
                    {"fields": "promotion_status,comments{comment_count},shares,insights{post_story_adds_unique,name,values,description},full_picture"}
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

                        case 'post_story_adds_by_action_type_unique' :
                            // "Lifetime: The number of stories created about your Page post, by action type. (Total No)"
                            value.actions = value.insights.data[k].values[0].value;
                            break;

                        case 'post_consumptions_unique' :
                            // Clicks
                            // "Lifetime: The number of people who clicked anywhere in your post. (Unique Users)"
                            value.actions.post_consumptions_unique = value.insights.data[k].values[0].value;
                            break;

                        case 'post_impressions_unique':
                            // "Lifetime: The total number of people your Page post was served to. (Unique Users)"
                            value.actions.post_impressions_unique = value.insights.data[k].values[0].value;
                            break;

                        case 'post_impressions_paid_unique':
                            // "Lifetime: The number of people your advertised Page post was served to. (Unique Users)"
                            value.post_impressions_paid_unique = value.insights.data[k].values[0].value;
                            break;

                        case 'post_impressions_by_paid_non_paid_unique':
                            // "Lifetime: The number of impressions of your Page post broken down by paid and non-paid. (Unique Users)"
                            value.post_impressions = value.insights.data[k].values[0].value;
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
                    clicks: value.actions.post_consumptions_unique + 1 | 0,
                    engagement: _.round(value.actions.post_consumptions_unique / value.actions.post_impressions_unique * 100, 1)
                };

                value.organic_score = _.round(_.sum(value.scores),1)
            });

            $scope.bestOrganicPosts = _.sortByOrder(organicScores, ['post_impressions_paid_unique', 'scores.engagement', 'organic_score'], ['asc', 'desc', 'desc']);
            console.log($scope.bestOrganicPosts);
        };
    }
]);