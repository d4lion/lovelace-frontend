export interface Option {
    image: string;
    description: string;
    
}

export interface Question {
    questionText: string;
    key: string;
  options: Option[];
  selectedOption?: Option;
}