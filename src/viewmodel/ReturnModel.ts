export class ReturnModel {

  constructor(data: any = {}, msg: string = 'success', code: number = 200, error: string = '') {
    this.data = data
    this.msg = msg
    this.code = code
    this.error = error
  }

  data: any;

  msg: string;

  code: number;

  error: string
}
