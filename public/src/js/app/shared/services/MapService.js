(function() {
    'use strict';
    angular.module('iNeedTreez')
        .factory('MapService', MapService);

        function MapService() {
            L.mapbox.accessToken = 'pk.eyJ1IjoibG9rZXNoLWJhbnNhbCIsImEiOiJhMjgyN2M1MDY3YjNiYjdiN2NiYjNhZmJjNmMyYzQ1NiJ9.lyrd8YhsRoxcq2bn7-M60A';

            var MapService = {
                activate: activate,
                searchBusinesses: searchBusinesses
            };

            return MapService;

            function searchBusinesses(lat, lng) {

                if(lat) {

                    var map = L.mapbox.map('map', 'mapbox.streets', {scrollWheelZoom: false}).setView([lat, lng], 10);
       
                        var marker = L.marker([lat, lng], {
                            icon: L.mapbox.marker.icon({
                            'marker-color': '#f86767'
                            }),
                            zoom: 13,
                            draggable: false
                        }).addTo(map);                   
                
                } else {

                    navigator.geolocation.getCurrentPosition(
                        function(position) {
                            var map = L.mapbox.map('map', 'mapbox.streets', {scrollWheelZoom: false}).setView([position.coords.latitude, position.coords.longitude], 10);

                            var marker = L.marker([position.coords.latitude, position.coords.longitude], {
                                icon: L.mapbox.marker.icon({
                                'marker-color': '#f86767'
                                }),
                                zoom: 13,
                                draggable: false
                            }).addTo(map);

                        },
                        function() {
                            console.log("geolocation not supported!!");
                        }
                    );
                }
            }


            function activate(lat, lng, type) {
          
                var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, lng], 13);
           
                var marker = L.marker([lat, lng], {
                    icon: L.mapbox.marker.icon({
                        'marker-color': '#f86767'
                    }),
                    draggable: false
                }).addTo(map);

                marker.bindPopup(type);

                marker.on('mouseover', function(e) {
                    marker.openPopup();
                });
                marker.on('mouseout', function(e) {
                    marker.closePopup();
                });
                 
                 
                // if(type.toLowerCase() == "legal") {
                //     var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, lng], 10);
                //     var category = L.icon({
                //         iconUrl: 'src/images/lgl.png',
                //         iconSize:[45, 45], // size of the icon
                //     });
                //     var marker = L.marker([lat, lng], {
                //         icon: category,
                //         zoom: 14,
                //         draggable: false
                //     }).addTo(map);

                //     marker.bindPopup(type);
                    
                //     marker.on('mouseover', function(e) {
                //         marker.openPopup();
                //     });
                //     marker.on('mouseout', function(e) {
                //         marker.closePopup();
                //     });
                // }

                // if(type.toLowerCase() == "tools") {
                //     var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, lng], 10);
                //     var category = L.icon({
                //         iconUrl: 'src/images/tools.png',
                //         iconSize:[45, 45], // size of the icon
                //     });
                //     var marker = L.marker([lat, lng], {
                //         icon: category,
                //         zoom: 14,
                //         draggable: false
                //     }).addTo(map);

                //     marker.bindPopup(type);
                    
                //     marker.on('mouseover', function(e) {
                //         marker.openPopup();
                //     });
                //     marker.on('mouseout', function(e) {
                //         marker.closePopup();
                //     });
                // }

                // if(type.toLowerCase() == "products") {
                //     var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, lng], 10);
                //     var category = L.icon({
                //         iconUrl: 'src/images/products.png',
                //         iconSize:[45, 45], // size of the icon
                //     });
                //     var marker = L.marker([lat, lng], {
                //         icon: category,
                //         zoom: 14,
                //         draggable: false
                //     }).addTo(map);

                //     marker.bindPopup(type);
                    
                //     marker.on('mouseover', function(e) {
                //         marker.openPopup();
                //     });
                //     marker.on('mouseout', function(e) {
                //         marker.closePopup();
                //     });
                // }

            
            }
        }////////////////End of MapService////////////////////

}());
