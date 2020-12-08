/***
 *
 * @return {string} uid
 */
export const  ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

/***
 *
 * @param data
 * @return string to download the file
 */
export const download = (data) => {
    var exportData = 'data:text/json;charset=utf-8,';

    // just export the minium
    const cleanUp = data.map(i => ({
        Name: i.Name,
        Latitude: i.Latitude,
        Longitude: i.Longitude
    }));
    exportData += encodeURIComponent(JSON.stringify(cleanUp));
    return exportData;
};

/***
 *
 * @param lat
 * @param long
 * @return {pbject}
 */
export const doLatLong = (lat, long) => {
    return {
        "Latitude": lat,
        "Longitude": long
    };
};

/***
 *
 * @param latLong
 */
export const convertLatLong = (latLong) => {
    return {
        lat: latLong.Latitude,
        lng: latLong.Longitude
    };
};

