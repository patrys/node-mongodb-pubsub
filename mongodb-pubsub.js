var microtime = require('microtime')

var Publisher = function(database, collection_name, callback) {
    var that = this;
    that.push = function(record) {
        record._id = microtime.nowDouble();
        that.collection.insert(record);
    };
    database.createCollection(collection_name, {capped:true, size:1000000}, function(error, collection) {
        that.collection = collection;
        callback(that, error);
    });
};

var Subscriber = function(database, collection_name, callback) {
    var that = this;
    that.listen = function(criteria, callback) {
        that.collection.find(criteria, {tailable:true}, function(error, cursor) {
            if (error) {
                callback(error, null);
            } else {
                cursor.each(callback);
            }
        });
    };
    database.collection(collection_name, function(error, collection) {
        that.collection = collection;
        callback(that, error);
    });
};

module.exports = {
    Publisher: Publisher,
    Subscriber: Subscriber
};