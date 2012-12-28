 var Db = require('mongodb').Db,
 Connection = require('mongodb').Connection,
 Server = require('mongodb').Server;

 var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST']: 'localhost';
 var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

 console.log("Connecting to" + host + ":" + port);

 var db = new Db('villages', new Server(host,port, {}), {native_parser: false});


exports.connect = function(callback){

 db.open(function(err, db){
 	if(err){
 		console.log("The villages doesn't exist, populating data with samples");
 	} else {
 		db.collection('villages', function(err, collection){
 			collection.find().toArray(function(err, result){
 				if(result.length === 0){
 					console.log("Populeaza baza de date");
 					exports.populateDb(callback);
 				}
 			});
 		});
 	}
 	console.log("Connection Established");
 	//callback();
 });

};

/** Get village list from database **/
exports.getList = function (callback)
{
		db.collection("villages", function(err, collection){
			collection.find().toArray(function(err, docs){
				callback(docs);
			});
		});
}

/** Get detailed information about a village **/
exports.getElement = function(ids,callback)
{
	console.log("Ids value " + ids);
	db.collection("villages",function(err, collection){
		collection.find({id: parseInt(ids,10)}).nextObject(function(err, elem){
			console.log("Found the element" + JSON.stringify(elem));
			console.log(err);
				callback(elem);
		});
	});
}

/** Populate an empty database **/
exports.populateDb = function(callback)
{

 	var villages = [
 	{
 		id: 0,
 		name: "Sarmisegetuza",
 		top: 0,
 		left: 830,
 		population: 1500,
 		description: "The capital of Dacians, one of the most powerful nation."

 	},
 	{
 		id: 1,
 		name: "Ankara",
 		top: 136,
 		left: 1000,
 		population: 1350,
 		description: "Relatively poor city, lots of sands and no water"
 	},
 	{
 		id: 2,
 		name: "Cairo",
 		top: 508,
 		left: 960,
 		population: 960,
 		description: "The power of Nil, the scity on the river"
 	},
 	{
 		id: 3,
 		name: "Sahara City",
 		top: 587,
 		left: 396,
 		population: 830,
 		description: "Small city in desert Sahara, water is the most precious resource"
 	},
 	{
 		id: 4,
 		name: "Corsica",
 		top: 200,
 		left: 396,
 		population: 1100,
 		description: "City situated on small island know for it's production of palm oil"

 	},
 	{
 		id: 5,
 		name: "Valencia",
 		top: 194,
 		left: 99,
 		population: 1300,
 		description: "To be continued..."
 	},
 	{
 		id: 6,
 		name: "Damask",
 		top: 330,
 		left: 1155,
 		population: 1400,
 		description: "To be continued..."
 	},
 	{
 		id: 7,
 		name: "Rome",
 		top: 144,
 		left: 555,
 		population: 2000,
 		description: "To be continued..."
 	}
 	]

 	db.collection('villages',function(err, collection){
 		collection.insert(villages, {safe:true}, function(err, result)
 		{
 			console.log("Elements added");
 			callback();
 		});
 	});
 }