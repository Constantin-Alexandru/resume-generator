export default class IResponse {
  message: string;
  object: any;
  success: boolean;

  constructor(message: string, object: any, success: boolean) {
    this.message = message;
    this.object = object;
    this.success = success;
  }
}
