module.exports = function(app, config) {

    //home route
    var home = require('../app/controllers/home')(app, config);
    var search = require('../app/controllers/search')(app, config);
    var mapping = require('../app/controllers/mapping')(app, config);
    var view = require('../app/controllers/view')(app, config);
    var summary = require('../app/controllers/summary')(app, config);

    var cache = require('../app/lib/cache.js')(app, config);

    // app.use(function(req, res, next){
    //     console.log(req.originalUrl);
    //     console.log(req.body);
    //     console.log(req.params);
    //     next();
    // })

    app.route('/')
        .get(home.index);
    app.route('/v1*')
        .get(home.v1);
    app.route('/v2')
        .get(home.v2);
    app.route('/idigbio/:t/_search')
        .get(home.searchProxy)
        .post(home.searchProxyPost);
    app.route('/idigbio/:t/_count')
        .get(home.searchProxy)
        .post(home.searchProxyPost);
    app.route('/v2/meta/fields/:t')
        .get(home.indexFields);
    app.get('/v2/view/:uuid', view.basic);
    app.get('/v2/view/:t/:uuid', view.basic);
    app.route('/v2/search')
        .get(search.basic)
        .post(search.basic);
    app.route('/v2/search/records')
        .get(search.basic)
        .post(search.basic);
    app.route('/v2/media')
        .get(search.media)
        .post(search.media);
    app.route('/v2/search/media')
        .get(search.media)
        .post(search.media);
    app.route('/v2/search/recordsets')
        .get(search.recordsets)
        .post(search.recordsets);
    app.route('/v2/search/publishers')
        .get(search.publishers)
        .post(search.publishers);
    app.route('/v2/summary/top/media')
        .get(summary.top_media)
        .post(summary.top_media);
    app.route('/v2/summary/top/basic')
        .get(summary.top_basic)
        .post(summary.top_basic);
    app.route('/v2/summary/top/records')
        .get(summary.top_basic)
        .post(summary.top_basic);
    app.route('/v2/summary/count/media')
        .get(summary.count_media)
        .post(summary.count_media);
    app.route('/v2/summary/count/basic')
        .get(summary.count_basic)
        .post(summary.count_basic);
    app.route('/v2/summary/count/records')
        .get(summary.count_basic)
        .post(summary.count_basic);
    app.route('/v2/summary/count/recordset')
        .get(summary.count_recordset)
        .post(summary.count_recordset);
    app.route('/v2/summary/modified/media')
        .get(summary.modified_media)
        .post(summary.modified_media);
    app.route('/v2/summary/modified/records')
        .get(summary.modified_basic)
        .post(summary.modified_basic);
    app.route('/v2/summary/datehist')
        .get(summary.date_hist)
        .post(summary.date_hist);
    app.route('/v2/summary/stats/:t')
        .get(summary.stats)
        .post(summary.stats);
    // app.route('/v2/mapping/:t')
    //     .get(mapping.basic)
    //     .post(mapping.basic);
    app.route('/v2/mapping/')
        .get(mapping.createMap)
        .post(mapping.createMap);

    app.use('/v2/mapping/:s', cache);

    app.route('/v2/mapping/:s')
        .get(mapping.getMap);
    app.route('/v2/mapping/:s/style/:z')
        .get(mapping.getMapStyle);
    app.route('/v2/mapping/:s/points')
        .get(mapping.mapPoints);
    app.route('/v2/mapping/:s/:z/:x/:y.:t')
        .get(mapping.getMapTile);

    app.use(function(err, req, res, next){
        if(err) {
            next(err);
        } else {
            res.status(404).json({"error": "Not Found"})
            next();
        }
    });
};