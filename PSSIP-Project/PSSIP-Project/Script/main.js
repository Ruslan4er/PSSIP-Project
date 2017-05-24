angular.module('gallery', ['ngRoute'])
    .config([
        '$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            $routeProvider
                .when('/Zootopia/gallery', {
                    templateUrl: '/views/home/gallery.html',
                    controller: 'GalleryController'
                })
                .when('/Zootopia/aboutUs', {
                    templateUrl: '/views/home/aboutUs.html',
                    controller: 'aboutUsController'
                })
                .when('/Zootopia/addNewImage', {
                    templateUrl: '/views/home/addNewImage.html',
                    controller: 'AddNewImgController'
                })
                .otherwise({
                    redirectTo: '/Zootopia/gallery'
                });

            $locationProvider.html5Mode(true);
        }
    ])
    .controller('GalleryController', [
        '$scope', 'dataCenter', function($scope, dataCenter) {

            $scope.remove = function(url) {
                dataCenter.remove(url);
            }

            var defered = dataCenter.getAll();
            defered.then(function(response) {
                $scope.Images = response.data;
            });
            
            var a = 123;

     

    	   // $scope.imgArray = DataImg.getImgObj();

    	    $scope.extensionsArray = [
                {
                    extensionChecker: /\.jpe?g$/i,
                    name: 'jpg'
                },
                {
                    extensionChecker: /\.png$/i,
                    name: 'png'
                },
                {
                    extensionChecker: /\.(?!jpe?g|png)$/i,
                    name: 'Остальное'
                }
    	    ];

    	    $scope.filterByExtension = function (img) {
    	        const selectedExtensions = $scope.extensionsArray.filter(extension => extension.isChecked);
    	        if (selectedExtensions.length) {
    	            return selectedExtensions.some(extension => {
    	                return extension.extensionChecker.test(img.Url);
    	            });
    	        } else {
    	            return true;
    	        }
    	    };

    	    //Всплывающие подсказки

    	    $scope.toggleTooltip = function (e) {
            
    	        if (e % 3 == 0) {
    	            event.stopPropagation();
    	            this.showtooltipRight = !$scope.showtooltipRight;
    	        }

    	        else {
    	            event.stopPropagation();
    	            this.showtooltipLeft = !$scope.showtooltipLeft;             
    	        }

    	        $scope.hideTooltip = function () {
    	            this.showtooltipLeft = false;
    	            this.showtooltipRight = false;
    	        }
    	    }
	       
	   

    	    /*
             $scope.toggleTooltip = function (e,image) {
                event.stopPropagation();
                image.showtooltip = !image.showtooltip;
            }
    
            $scope.hideTooltip = function(image){
                image.showtooltip = false;
            }
    
            */
    	}])


	.controller('aboutUsController', ['$scope', 'DataImg', function ($scope, DataImg) {
	    //Контроллер для описания

	}])

	.controller('AddNewImgController', ['$scope', 'dataCenter', function ($scope, dataCenter) {
	    //Контроллер для добавления новой картинки
	    $scope.newImgRate = {};
	    $scope.arrayOfRates = [1, 2, 3, 4, 5];
	    $scope.img = {};

	    $scope.addImg = function() {
	        dataCenter.add($scope.img.name, $scope.img.data,$scope.img.desc, $scope.img.star);
	        $scope.img = {};
	    }
	}])

    .service('dataCenter', ['$http', function($http) {
            return {
                getAll: getAll,
                add: add,
                remove: remove
            };

            function getAll() {
                return $http({
                    url: 'http://localhost:50368/Image/GetImage'
                });
            }

            function add(fileName, data) {
                var respons = $http({
                    method: 'POST',
                    url: 'http://localhost:50368/Image/AddImgAjax',
                    data: {
                        fileName: fileName,
                        data: data
                    },
                    headers: { 'Accept': 'application/json' }
                });
                return respons;
            };

            function remove(url) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:50368/Image/RemoveImage',
                    data: {
                        url: url
                    },
                    headers: { 'Accept': 'application/json' }
                });
            }

        }
    ])
    .directive("fileread", [
        function() {
            return {
                scope: {
                    fileread: "="
                },
                link: function(scope, elemet, attributes) {
                    elemet.bind("change", function(changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function(loadEvent) {
                            scope.$apply(function() {
                                scope.fileread = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }
    ]);;



