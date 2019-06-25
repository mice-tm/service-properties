class PropertyService {
  constructor(propertyModel) {
    this.propertyModel = propertyModel;
  }
  search (searchModel) {
    let pipelines = [];
    const skip = (searchModel.perPage * searchModel.page) - searchModel.perPage;
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
    } else {
      if (searchModel.locale) {
        pipelines.push(PropertyService.getLocalizedProjectionFields(locale))
      }
    }

    pipelines.push({
      '$sort': {'name': 1}
    });

    pipelines.push({
      '$facet': {
        'metadata': [
          {'$count': 'total'}
        ],
        'models': [
          {'$skip': skip},
          {'$limit': searchModel.perPage}
        ]
      }
    });

    return this.propertyModel.aggregate(pipelines)
      .exec()
    ;
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

  static getLocalizedProjectionFields(locale)
  {
    let fields = {
      '_id': true,
      'name': true,
      'type': true,
      'title': {
        'en': true
      },
    'active': true,
    'values': {
      'value': {
        'en': true
      },
      'active': true,
      'id': true,
      'image': true,
      'url': true,
    },
    'isSystem': true,
    'tags': true,
    'url': true,
    };
    fields.title[locale] = true;
    fields.values.value[locale] = true;
    return fields;
  }
}

module.exports = PropertyService;