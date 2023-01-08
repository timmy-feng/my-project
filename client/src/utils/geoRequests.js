export async function getAddress(latLng) {
    const result = await (new window.google.maps.Geocoder()).geocode({location: latLng});
    return result.results[0] ? result.results[0].formatted_address : 'No address found.';
}