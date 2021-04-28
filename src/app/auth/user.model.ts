export class User {
  constructor(
    private _token: string,
    public expiresIn: Date,
    public username: string,
    public userId: any
  ) {}

  get token() {
    if (!this.expiresIn || new Date() > this.expiresIn) {
      return null;
    }
    return this._token;
  }
}
