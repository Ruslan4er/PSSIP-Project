angular.module('guitar',['ngRoute'])
	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider){
		$routeProvider
		.when ('/Zootopia/gallery', {
			templateUrl: '/views/home/gallery.html',
			controller: 'GalleryController'
		})
		.when('/Zootopia/aboutUs', {
		    templateUrl: '/views/home/aboutUs.html',
		    controller: 'aboutUsController'
		})
		.when('/Zootopia/addNewImage', {
		    templateUrl: '/views/home/addNewImage.html',
			controller:'AddNewImgController'
		})
		.otherwise({
		    redirectTo: '/Zootopia/gallery'
		});

		 	$locationProvider.html5Mode(true);
	}])

	.service('DataImg', function () {


	    var imagesObj = [
			{
			    name: 'Judy Hopps',
			    src: 'img/Judy_Hopps.png',
			    description: 'Описание зайки',
			    rate: { value: 5 }
			},
			{
			    name: 'Nick Wilde',
			    src: 'img/Nick_Wilde.png',
			    description: 'Описание лиса',
			    rate: { value: 5 }
			},
			{
			    name: 'Officer Clawhauser',
			    src: 'img/Officer_Clawhauser.png',
			    description: 'Описание офицера',
			    rate: { value: 4 }
			},
			{
			    name: 'Chief Bogo',
			    src: 'img/Chief_Bogo.jpg',
			    description: 'Описание шерифа',
			    rate: { value: 3 }
			}
	    ];

	    function addNewImg(newImg) {
	        imagesObj.push(newImg);
	    }

	    var result = {
	        ImgName: 'name',
	        getImgObj: function () {
	            return imagesObj;
	        },
	        addImg: addNewImg
	    };
	    return result;
	})

	.controller('GalleryController', ['$scope', 'DataImg', function ($scope, DataImg) {

	    $scope.imgArray = DataImg.getImgObj();

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
	                return extension.extensionChecker.test(img.src);
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

	.controller('AddNewImgController', ['$scope', 'DataImg', function ($scope, DataImg) {
	    //Контроллер для добавления новой картинки
	    $scope.newImgUrl;
	    $scope.newImgName;
	    $scope.newImgDescription;
	    $scope.newImgRate = {};
	    $scope.arrayOfRates = [1, 2, 3, 4, 5];

	    $scope.saveText = function () {
	        DataImg.ImgName = $scope.newImgName;
	    }

	    $scope.add = function () {
	        var newObj = {
	            name: $scope.newImgName,
	            src: $scope.newImgUrl,
	            description: $scope.newImgDescription,
	            rate: $scope.newImgRate.value
	        }
	        DataImg.addImg(newObj);
	    }

	}]);