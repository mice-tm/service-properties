const VALUE_IDS = 'values.id';
class SearchProperty {
  constructor({
      tags = '',
      types = '',
      locale = 'en',
      embeddedFilter = [],
      page = 1,
      perPage = 20,
      fields = '',
      names = ''
    } = {}) {
    if ('string' !== typeof tags) {
      throw new Error('Tags should be string!');
    }
    if ('string' !== typeof types) {
      throw new Error('Types should be string!');
    }
    if ('string' !== typeof locale) {
      throw new Error('Locale should be string!');
    }
    if ('string' !== typeof fields) {
      throw new Error('Fields should be string!');
    }
    if ('string' !== typeof names) {
      throw new Error('Names should be string!');
    }
    if (!this.validateEmbeddedFilter(embeddedFilter)) {
      throw new Error('EmbeddedFilter is invalid!');
    }
    page = Number(page);
    perPage = Number(perPage);
    if (page < 1) {
      page = 1;
    }
    if (perPage > 1000) {
      perPage = 1000;
    }

    this.tags = tags;
    this.types = types;
    this.locale = locale;
    this.embeddedFilter = embeddedFilter;
    this.page = page;
    this.perPage = perPage;
    this.fields = fields;
    this.names = names;
  }

  validateEmbeddedFilter() {
    return true;
  }

  get filters () {
    let filters = {};
    if (this.tags) {
      filters.tags = {'$in': this.splitValue(this.tags)};
    }
    if (this.types) {
      filters.type = {'$in': this.splitValue(this.types)};
    }
    if (this.names) {
      filters.name = {'$in': this.splitValue(this.names)};
    }
    if (this.hasValueIdsFilter()) {
      filters[VALUE_IDS] = {
        '$in': this.valueIds
      }

    }
    return filters;
  }

  splitValue(value) {
    if (value.length > 0) {
      return value.split(',');
    }
    return [];
  }

  hasValueIdsFilter () {
    return (this.embeddedFilter && this.embeddedFilter[VALUE_IDS]);
  }

  get valueIds () {
    console.log(this.embeddedFilter[VALUE_IDS].split(',').map(parseInt));
    return this.embeddedFilter[VALUE_IDS].split(',').map(Number);
  }

}

module.exports = SearchProperty;