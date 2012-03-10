var pubsub = require('./mongodb-pubsub')
var mongo = require('mongodb')

var db = new mongo.Db('pubsub_db', new mongo.Server("127.0.0.1", 27017, {}));

db.open(function(error, db) {
    new pubsub.Subscriber(db, 'test_event', function(subscriber, error) {
        subscriber.listen({answer:42}, console.log);
    });
    new pubsub.Publisher(db, 'test_event', function(publisher, error) {
        publisher.push({message:'hello world', answer:42});
    });
});