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

		 //$locationProvider.html5Mode(true);

	}])

	.service('DataImg', function() {
			

		var imagesObj=[
			{
			  name:'Judy Hopps',
			  src:'img/Judy_Hopps.png',
			  description:'Описание зайки'
			},
			{
			  name:'Nick Wilde',
			  src:'img/Nick_Wilde.png',
  			  description:'Описание лиса'
			},
			{
			  name:'Officer Clawhauser',
			  src:'img/Officer_Clawhauser.png',
  			  description:'Описание офицера'
			},
			{
			  name:'Chief Bogo',
			  src:'img/Chief_Bogo.jpg',
  			  description:'Описание шерифа'
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
		$scope.newImg='3.jpg';
		$scope.name=4;
		$scope.addOne=function()
		{
		$scope.name++;
		}

	}])


	.controller('TextController', ['$scope', 'DataImg', function ($scope, DataImg){
	//Контроллер для описания

	}])

	.controller('AddNewImgController', ['$scope', 'DataImg', function ($scope, DataImg){
		//Контроллер для добавления новой картинки
		$scope.newImgUrl;
		$scope.newImgName;
		$scope.newImgDescription;
		
			$scope.saveText= function(){
				DataImg.ImgName = $scope.newImgName;
			}

			$scope.add=function(){
				var newObj = {
					name: $scope.newImgName,
					src: $scope.newImgUrl,
				  	description: $scope.newImgDescription
				}
			  DataImg.addImg(newObj);
			}

	}]);