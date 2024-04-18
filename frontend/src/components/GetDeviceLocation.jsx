import React, { useState, useEffect } from 'react';

function GetDeviceLocation() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log(navigator , ' navigator')
      console.log(navigator.geolocation , ' navigator')
      navigator.geolocation.getCurrentPosition(
        (position) => {

          console.log(position , ' position')
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);


  // function getLocationName(lat , lng){
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data.results , ' data.results')
  //   if (data.results && data.results.length > 0) {
  //     const addressComponents = data.results[0].address_components;
  //     setLocation(addressComponents)
  //     for (const component of addressComponents) {
  //       if (component.types.includes('locality')) {
  //         console.log('City:', component.long_name);
  //         break;
  //       }
  //     }
  //   } else {
  //     console.log('No results found');
  //   }
  // })
  // .catch(error => {
  //   console.error('Error fetching data:', error);
  // });
  // }

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {latitude && longitude && (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
        
      )}
    </div>
  );
}

export default GetDeviceLocation;
