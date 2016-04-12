angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope,$rootScope) {

	document.addEventListener("deviceready", function () {
		cordova.plugins.backgroundMode.setDefaults({
			text: 'Keeping Watch On JustDial SMS.'
		});
		// Enable background mode
		cordova.plugins.backgroundMode.enable();
		// Called when background mode has been activated
		cordova.plugins.backgroundMode.onactivate = function () {
			setTimeout(function () {
				// Modify the currently displayed notification
				cordova.plugins.backgroundMode.configure({
					text: 'Miraihealth SMS Watcher !!!!'
				});
			}, 2000);
		}
		initApp();

	}, false);
	
		$rootScope.list = [];
		function initApp() {
			if (!SMS) {
				alert('SMS plugin not ready');
				return;
			}
			if (SMS) SMS.startWatch(function () {
				$rootScope.list.push('JustDial SMS Watch started');
			}, function () {
				$rootScope.list.push('Failed to Start JustDial SMS Watch ');
			});

			document.addEventListener('onSMSArrive', function (e) {
				var data = e.data;
				console.log(e);
				$rootScope.list.push('From => ' + data.address + ' Message Body => ' + JSON.stringify(data.body));
				$rootScope.$apply();
			});
		}
	
	
});
