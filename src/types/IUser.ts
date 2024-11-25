export interface ICreateUserData {
    id: number | string;
    name: string;
    lastName: string | null;
    email: string;
}

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  register_at: string;
  suggestions: Suggestion[];
  preferences: Preference[];
}

export interface Suggestion {
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
  img: string;
}

export interface EuropaCountry {
  name: string;
  city: string;
  continent: string;
  img: string;
}

export interface Preference {
  climate: string;
  activity: string;
  housing: string;
  duration: string;
  age: string;
}
