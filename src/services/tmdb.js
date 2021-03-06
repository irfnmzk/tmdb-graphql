const { RESTDataSource } = require("apollo-datasource-rest");
const { AuthenticationError } = require("apollo-server-core");
const camelcaseKeys = require("camelcase-keys");

const BASE_URL = "https://api.themoviedb.org/3";

class TMDBDataSource extends RESTDataSource {
  constructor() {
    super();
  }

  willSendRequest(request) {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      throw new AuthenticationError("No TMBD_API_KEY provided!");
    }

    request.params.set("api_key", apiKey);
  }

  format(obj) {
    return camelcaseKeys(obj, { deep: true });
  }
}

class CompanyDataSource extends TMDBDataSource {
  constructor() {
    super();
    this.baseURL = `${BASE_URL}/company`;
  }

  async company({ id }) {
    const data = await this.get(`/${id}`);
    return this.format(data);
  }

  async alternativeNames({ id }) {
    const data = await this.get(`/${id}/alternative_names`);
    return this.format(data.results);
  }
}

class GenreDataSource extends TMDBDataSource {
  constructor() {
    super();
    this.baseURL = `${BASE_URL}/genre`;
  }

  async movies() {
    const data = await this.get("/movie/list");
    return this.format(data.genres);
  }

  async tvs() {
    const data = await this.get("/tv/list");
    return this.format(data.genres);
  }
}

class MovieDataSource extends TMDBDataSource {
  constructor() {
    super();
    this.baseURL = `${BASE_URL}/movie`;
  }

  async movie({ id }) {
    const data = await this.get(`/${id}`);
    return this.format(data);
  }

  async alternativeTitles({ id }) {
    const data = await this.get(`/${id}/alternative_titles`);
    return this.format(data.titles);
  }

  async credits({ id }) {
    const data = await this.get(`/${id}/credits`);
    return this.format({ cast: data.cast, crew: data.crew });
  }

  async externalIds({ id }) {
    const data = await this.get(`/${id}/external_ids`);
    return this.format(data);
  }

  async images({ id }) {
    const data = await this.get(`/${id}/images`);
    return this.format(data);
  }

  async keywords({ id }) {
    const data = await this.get(`/${id}/keywords`);
    return this.format(data.keywords);
  }

  async recommendations({ id, page }) {
    const data = await this.get(`/${id}/recommendations?page=${page}`);
    return this.format(data);
  }
}

module.exports = {
  CompanyDataSource,
  GenreDataSource,
  MovieDataSource,
};
