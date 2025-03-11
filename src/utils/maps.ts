
// Load Google Maps API script
export const loadGoogleMapsApi = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if API is already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Handle script load
    script.onload = () => {
      resolve();
    };

    // Handle script error
    script.onerror = () => {
      reject(new Error('Google Maps API failed to load'));
    };

    // Add the script to the document
    document.head.appendChild(script);
  });
};

// Extract place details from Place ID
export const getPlaceDetails = (
  placeId: string,
  sessionToken: google.maps.places.AutocompleteSessionToken
): Promise<google.maps.places.PlaceResult> => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      reject(new Error('Google Maps API not loaded'));
      return;
    }

    const placesService = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    placesService.getDetails(
      {
        placeId,
        fields: ['name', 'formatted_address', 'geometry', 'place_id'],
        sessionToken
      },
      (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          resolve(result);
        } else {
          reject(new Error(`Place details request failed: ${status}`));
        }
      }
    );
  });
};
