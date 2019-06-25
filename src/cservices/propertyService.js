class PropertyService {
  constructor(propertyModel) {
    this.propertyModel = propertyModel;
  }
  search (searchModel) {
    let result = [];
    return this.propertyModel.find(searchModel.filters)
      // .limit(searchModel.perPage)
      // .skip((searchModel.page - 1) * searchModel.perPage)
      .exec()
    ;
  //   $this->perPage = $request->getQueryParam('per-page');
  //   $this->fields = $request->getQueryParam('fields');
  //
  //   if ($this->load($request->getQueryParams(), '') && $this->validate()) {
  //     if ($tags = array_filter(explode(',', $this->tags))) {
  //       $query->andWhere(['tags' => ['$in' => $tags]]);
  //     }
  //     $query
  //       ->setLocale($this->locale)
  //   ->setEmbeddedFilter($this->embeddedFilter)
  //   ->andFilterWhere(['type' => array_filter(explode(',', $this->types))]);
  //     if ($names = $request->getQueryParam('names', null)) {
  //       $query->andFilterWhere(['name' => array_filter(explode(',', $names))]);
  //     }
  //   }
  //
  //   $this->filterPages();
  //
  //   $aggregationResult = $query->getAggregateData($this->perPage, $this->page, $this->fields);
  //
  //   $pagination = new Pagination();
  //   $pagination->setPageSize($aggregationResult->getPerPage());
  //   if ($aggregationResult->getCurrentPage() > 1) {
  //     $pagination->setPage($aggregationResult->getCurrentPage());
  //   }
  //   $pagination->totalCount = $aggregationResult->getTotalCount();
  //
  //   $dataProvider = new ArrayDataProvider([
  //     'allModels' => $aggregationResult->getData(),
  //     'pagination' => $pagination
  // ]);

    return result;
  }
}

module.exports = PropertyService;