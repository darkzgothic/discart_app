/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
/******/ })
/************************************************************************/
/******/ ({

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// // var imported = document.createElement('script');
// // imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4Ro6tq4pr5oNl_H2a1veIwOMGo03yA78&libraries=places&callback=initMap';
// // document.head.appendChild(imported);

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 23.810332, lng: 90.412518 },
//         zoom: 13
//     });
//     var geocoder = new google.maps.Geocoder();

//     var input = document.getElementById('searchInput');
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//     var autocomplete = new google.maps.places.Autocomplete(input);
//     autocomplete.bindTo('bounds', map);

//     var marker = new google.maps.Marker({
//         map: map,
//         draggable: true,
//         anchorPoint: new google.maps.Point(0, -29)
//     });

//     autocomplete.addListener('place_changed', function () {
//         marker.setVisible(false);
//         var place = autocomplete.getPlace();
//         if (!place.geometry) {
//             window.alert("Autocomplete's returned place contains no geometry");
//             return;
//         }

//         if (place.geometry.viewport) {
//             map.fitBounds(place.geometry.viewport);
//         } else {
//             map.setCenter(place.geometry.location);
//             map.setZoom(16);
//         };
//         marker.setPosition(place.geometry.location);
//         marker.setVisible(true);

//         var address = '';
//         if (place.address_components) {
//             address = [
//                 (place.address_components[0] && place.address_components[0].short_name || ''),
//                 (place.address_components[1] && place.address_components[1].short_name || ''),
//                 (place.address_components[2] && place.address_components[2].short_name || '')
//             ].join(' ');
//         }
//         document.getElementById('location').innerHTML = place.formatted_address;
//         document.getElementById('lat').innerHTML = place.geometry.location.lat();
//         document.getElementById('lon').innerHTML = place.geometry.location.lng();
//     });

//     google.maps.event.addListener(marker, "dragend", function () {
//         var point = marker.getPosition();
//         geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 document.getElementById('location').innerHTML = results[0].formatted_address;
//                 document.getElementById('lat').innerHTML = marker.getPosition().lat();
//                 document.getElementById('lon').innerHTML = marker.getPosition().lng();
//             }
//         });
//     });
// }

// document.addEventListener('DOMContentLoaded', initMap);


/***/ })

/******/ });