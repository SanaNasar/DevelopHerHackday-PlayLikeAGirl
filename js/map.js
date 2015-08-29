// alert("Hello world");
var map;  // Google map object
  
  // Initialize and display a google map
  $(function() {
    // Create a Google coordinate object for where to initially center the map
    var latlng = new google.maps.LatLng(37.7662821,-122.4476238); // San Francisco, CA
    
    // Map options for how to display the Google map
    var mapOptions = { zoom: 12, center: latlng  };
    
    // Show the Google map in the div with the attribute id 'map-canvas'.
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Update the Google map for the user's inputted address
    $( "#locate" ).click( function( event ) {
      var geocoder = new google.maps.Geocoder();    // instantiate a geocoder object
      
      // Get the user's inputted address
      var address = document.getElementById( "address" ).value;
    
      // Make asynchronous call to Google geocoding API
      geocoder.geocode( { 'address': address }, function(results, status) {
        var addr_type = results[0].types[0];  // type of address inputted that was geocoded
        // console.log(results[0].geometry.location)
        if ( status == google.maps.GeocoderStatus.OK )
          ShowLocation( results[0].geometry.location, address, addr_type );
        else
          alert("Geocode was not successful for the following reason: " + status);
      });
    } );
  } );
  
  // Show the location (address) on the map.
  function ShowLocation( latlng, address, addr_type )
  {
    // Center the map at the specified location
    map.setCenter( latlng );
    
    // Set the zoom level according to the address level of detail the user specified
    var zoom = 12;
    switch ( addr_type )
    {
    case "administrative_area_level_1"  : zoom = 6; break;    // user specified a state
    case "locality"           : zoom = 10; break;   // user specified a city/town
    case "street_address"       : zoom = 15; break;   // user specified a street address
    }
    map.setZoom( zoom );
    
    // Place a Google Marker at the same location as the map center 
    // When you hover over the marker, it will display the title
    var marker = new google.maps.Marker( {
      position: latlng,
      map: map,
      title: address
    });
    
    // Create an InfoWindow for the marker
    var contentString = "<b>" + address + "</b>"; // HTML text to display in the InfoWindow
    var infowindow = new google.maps.InfoWindow( { content: contentString } );
    
    // Set event to display the InfoWindow anchored to the marker when the marker is clicked.
    google.maps.event.addListener( marker, 'click', function() { infowindow.open( map, marker ); });
  }