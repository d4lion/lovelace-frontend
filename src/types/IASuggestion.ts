export interface IASuggestion {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
}

export interface Candidate {
  content: Content;
  finishReason: string;
  avgLogprobs: number;
}

export interface Content {
  parts: Part[];
  role: string;
}

export interface Part {
  text: string;
}

export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}
