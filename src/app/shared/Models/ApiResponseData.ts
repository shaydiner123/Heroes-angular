export interface ApiResponseData<T> {
  isSuccess: boolean;
  error?: ResponseError;
  content?: T;
}

export interface ResponseError {
  reason?: string;
  messages: string[];
}
