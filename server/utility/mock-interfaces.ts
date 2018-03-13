/** Interface for mocking express requests. */
export class MockReq {
    public jwt: any;
    public body: any;
    public query: any;
    public headers: any;
}

/** Interface for mocking express results. */
export class MockRes {
  private _status;
  private _json;
  private _send;

  public status(status?: any) {
    if (status !== undefined) {
      this._status = status;
    }
    else {
      return this._status;
    }
  }

  public json(json?: any) {
    if (json !== undefined) {
      this._json = json;
    }
    else {
      return this._json;
    }
  }

  public send(send?: any) {
    if (send !== undefined) {
      this._send = send;
    }
    else {
      return this._send;
    }
  }
}
