class PropertyService {
  constructor(propertyModel) {
    this.propertyModel = propertyModel;
  }
  search (searchModel) {
    let pipelines = [];
    if (searchModel.filters) {
      pipelines.push({
        '$match': searchModel.filters
      });
    }

    if (searchModel.hasValueIdsFilter()) {
      pipelines.push({
        '$addFields': {
          'values': {
            '$filter': {
              'input': '$values',
              'as': 'value',
              'cond': {
                '$setIsSubset': [['$$value.id'], searchModel.valueIds],
              },
            },
          },
        },
      });
    }

    if (searchModel.fields) {
      pipelines.push({
        '$project': this.explodeProjectFromFields(searchModel.fields)
      })
    }
console.log(pipelines);
    // return pipelines;
    return this.propertyModel.aggregate(pipelines)
    //   .limit(searchModel.perPage)
    //   .skip((searchModel.page - 1) * searchModel.perPage)
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

  explodeProjectFromFields (fields) {
    let fieldsProjection = fields.split(',');
    if (!fieldsProjection) {
      return {};
    }

    // fieldsProjection.forEach(function (subpath) {
    //   if (subpath.indexOf('.') >= 0 ) {
    //     fieldsProjection = fieldsProjection.concat(subpath.split('.'));
    //     console.log(subpath, fieldsProjection);
    //   }
    // });

    fieldsProjection = fieldsProjection.map(function (key) {
      let item = {};
      item[key] = true;
      return item;
    });
    return Object.assign({}, ...fieldsProjection);

  }
}

module.exports = PropertyService;