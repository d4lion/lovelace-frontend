export interface Option {
    image: string;
    description: string;
    dato: string;
}

export interface Question {
    questionText: string;
    key: string;
  options: Option[];
  selectedOption?: Option;
}

export interface IAnswers {
  climate: string;
  activity: string;
  housing: string;
  duration: string;
  age: string;
}

export interface IBackendData {
  user_id: string;
  climate: string;
  activity: string;
  housing: string;
  duration: string;
  age: string;
}