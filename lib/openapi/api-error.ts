export default class FetchApiError extends Error {
  response: Response;
  private _json: unknown = null;

  constructor(response: Response) {
    super(`API Error (${response.status}): ${response.statusText}`);
    this.name = "FetchApiError";
    this.response = response;
  }

  async json() {
    if (this._json) {
      return this._json;
    }

    try {
      this._json = await this.response.json();
    } catch (error) {
      console.error("Не вдалося розібрати JSON з відповіді:", error);
      this._json = {};
    }

    return this._json;
  }

  async humanReadableJSONMessage() {
    const json = await this.json();
    return (json as { message?: string })?.message || "Виникла помилка";
  }

  static async fromResponse(response: Response): Promise<FetchApiError> {
    return new FetchApiError(response);
  }
}
