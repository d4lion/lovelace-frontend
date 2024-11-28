export interface SuggestionResponse {
  data: Data;
  error: any;
}

export interface Data {
  id?: string | number;
  user_id: number;
  climate: string;
  activity: string;
  housing: string;
  duration: string;
  age: string;
  america_country: AmericaCountry;
  europa_country: EuropaCountry;
}

export interface AmericaCountry {
  name: string;
  city: string;
  continent: string;
  img: any;
}

export interface EuropaCountry {
  name: string;
  city: string;
  continent: string;
  img: any;
}
