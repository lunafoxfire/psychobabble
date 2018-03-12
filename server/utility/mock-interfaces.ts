/** Interface for mocking express requests. */
export class MockReq {
    public jwt: any;
    public body: any;
}

/** Interface for mocking express results. */
export class MockRes {
  private _status;
  private _json;

  public status(status: any) {
    if (status !== undefined) {

    }
  }
}
