import Geocode from "react-geocode";
import GOOGLE_API_KEY from "../env";

Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLocationType("ROOFTOP");
export default async function decodeLocation(latLng) {
    console.log(latLng)
    //   try {
    //     await Geocode.fromLatLng(currentPosition.lat, currentPosition.lng).then(
    //       (response) => {
    //         return response.result[0].formatted_address;
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log("currentPosition", currentPosition);
    let address = await Geocode.fromLatLng(
        latLng.lat,
        latLng.lng
    ).then(
        (response) => {
            return response.results[0].formatted_address;
        },
        (error) => {
            console.error(error);
            throw error;
        }
    );
    return address;
}
