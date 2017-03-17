angular.module('guitar',['ngRoute'])
	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider){
		$routeProvider
		.when ('/gallery', {
			templateUrl: 'gallery.html',
			controller:'IndexController'
		})
		.when ('/text',{
			templateUrl: 'text.html',
			controller:'TextController'
		})
		.when ('/addNewImage',{
			templateUrl: 'addNewImage.html',
			controller:'AddNewImgController'
		})
		.otherwise({
			redirectTo:'/gallery'
		});

		 //	$locationProvider.html5Mode(true);
	}])

	.service('DataImg', function() {
			

		var imagesObj=[
			{
			  name:'Judy Hopps',
			  src:'img/Judy_Hopps.png',
			  description:'Описание зайки',
			  rate: {value: 5}
			},
			{
			  name:'Nick Wilde',
			  src:'img/Nick_Wilde.png',
  			  description:'Описание лиса',
			  rate: {value: 5}
			},
			{
			  name:'Officer Clawhauser',
			  src:'img/Officer_Clawhauser.png',
  			  description:'Описание офицера',
			  rate: {value: 4}
			},
			{
			  name:'Chief Bogo',
			  src:'img/Chief_Bogo.jpg',
  			  description:'Описание шерифа',
			  rate: {value: 3}
			}
		];

	 function addNewImg(newImg){
	 	imagesObj.push(newImg)
	 }

	var result = {
			ImgName: 'name',
			getImgObj: function(){
				return imagesObj;
			},
			addImg: addNewImg
		};
		return result;
	})

	.controller('IndexController', ['$scope', 'DataImg', function ($scope, DataImg){
	
		$scope.imgArray = DataImg.getImgObj();

		class Extension {
			constructor(extensionChecker, name) {
			    this.name = name;
				this.extensionChecker = extensionChecker;
				this.isChecked = true;
			}

			check(path) {
			    return this.extensionChecker.test(path);
            }
		}

		$scope.extensionsArray = [
		    new Extension(/\.jpe?g$/i, 'jpg'),
            new Extension(/\.png$/i, 'png'),
            new Extension(/\.(?!jpe?g|png)$/i, 'Остальное')
        ];

		$scope.filterByExtension = function (img) {
            const selectedExtensions = $scope.extensionsArray.filter(extension => extension.isChecked);
            if (selectedExtensions.length) {
                return selectedExtensions.some(extension => {
                   return extension.check(img.src);
                });
            } else {
                return true;
            }
        };

		//Всплывающие подсказки 
				this.showtooltip = false;
		
				$scope.hideTooltip = function(){
					this.showtooltip = false;
				}

				$scope.toggleTooltip = function(e){
					event.stopPropagation();
					this.showtooltip = !$scope.showtooltip;
				}
	}])


	.controller('DescriptionController', ['$scope', 'DataImg', function ($scope, DataImg){
	//Контроллер для описания

	}])

	.controller('AddNewImgController', ['$scope', 'DataImg', function ($scope, DataImg){
		//Контроллер для добавления новой картинки
		$scope.newImgUrl;
		$scope.newImgName;
		$scope.newImgDescription;
		$scope.newImgRate = {};
		$scope.arrayOfRates=[1,2,3,4,5];

		$scope.saveText= function(){
			DataImg.ImgName = $scope.newImgName;
		}

		$scope.add=function(){
			var newObj = {
				name: $scope.newImgName,
				src: $scope.newImgUrl,
			  	description: $scope.newImgDescription,
				rate: $scope.newImgRate.value
			}
		  DataImg.addImg(newObj);
		}

	}]);