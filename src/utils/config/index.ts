export class AppConfig {

    //This will be coming from environment
    private static readonly API_KEY = "AIzaSyB4SjLQF8OBwFwaB-Fgtc8au9idD4DN-Kw";
    static readonly API_URL = (searchStr: string) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchStr}&key=${this.API_KEY}`;
    static readonly GOOGLE_PLACE_DETAIL_API_URL = (placeId: string) => `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${placeId}&key=${this.API_KEY}`;

}