class AggregationResult {
  constructor({
      perPage,
      skip,
      metadata = [],
      models = []
    } = {}) {
    this.models = models;
    this.totalCount = 0;
    if (metadata && typeof metadata[0].total !== 'undefined') {
      this.totalCount = metadata[0].total;
    }
    this.perPage = perPage || 1;
    this.skip = skip || 0;
  }
  get currentPage() {
    if (this.skip) {
      if (this.skip > this.totalCount) {
        this.skip = this.totalCount;
      }

      return Math.ceil(this.skip / this.perPage);
    }
    return 1;
  }
  get pageCount() {
    if (this.totalCount) {
      return Math.ceil(this.totalCount / this.perPage);
    }
    return 1;
  }
}

module.exports = AggregationResult;