export class Geo {
         lat: string;
         lng: string;
         /**
          *
          */
         constructor(
           data: {
             lat?: string;
             lng?: string;
           } = {}
         ) {
           this.lat = data.lat;
         }
       }
