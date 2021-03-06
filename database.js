 var Db = require('mongodb').Db,
 Connection = require('mongodb').Connection,
 Server = require('mongodb').Server;

 var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST']: 'localhost';
 var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

 console.log("Connecting to" + host + ":" + port);

 var db = new Db('main', new Server(host,port, {}), {native_parser: false, safe: true});


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
 					return;
 				}
 			});
 		});
 	}
 	console.log("Connection Established");
 	callback();
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
			//console.log("Found the element" + JSON.stringify(elem));
			//console.log(err);
				callback(elem);
		});
	});
}
/** Get user info from database **/
exports.getUser = function(username,callback)
{
	db.collection("users", function(err,collection){
		collection.find({name: username}).nextObject(function(err,elem){
			callback(elem);
		});
	});
};

/** Add new user to database **/
exports.addUser = function(user, callback)
{
	db.collection('users',function(err, collection){
		collection.insert(user, {safe:true}, function(err,result){
			console.log("User added!");
			addPlayerStats(user.name,callback);
		});
	});
}
/** Add level 1 player stats when new user register **/
addPlayerStats = function(user,callback)
{
	var newStats = {
		name: user,
		level: 1,
		gold: 10,
		silver: 10,
		strength: 30,
		agility: 25,
		vitality: 20,
		intellect: 20
	};

	db.collection('playerstats',function(err, collection){
		collection.insert(newStats, {safe:true}, function(err,result){
			console.log("Player Stats added!");
			callback();
		});
	});
}
/** Get player stats from database **/
exports.getPlayerStats = function(user,callback)
{
	db.collection('playerstats',function(err, collection){
		collection.find({name: user}).nextObject(function(err,elem){
			callback(elem);
		});
	});
}
/** Populate an empty database **/

exports.populateDb = function(callback)
{
	populateVillageDb(function(){
		populateUserDb(function(){
			populatePlayerStats(callback);
		});
	});
}
/** Add villages to database **/
populateVillageDb = function(callback)
{

	/** Populate villages **/
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

/** Populate database with a test user **/
populateUserDb = function(callback)
{
 	var user = [
	 	{
	 		id: 	0,
	 		name: "test",
	 		token: "abbad13",
	 		password: "testabbad13"
	 	}
 	]
 	db.collection('users',function(err, collection){
 		collection.insert(user, {safe:true},function(err,result){
 			console.log("Users added");
 			callback();
 		});
 	});
 }

/** Populate database with test user's player stats **/
populatePlayerStats = function(callback)
 {
 	var playerStat = [
	 	{
	 		name: "test",
	 		level: 5,
	 		gold: 500,
	 		silver: 200,
	 		strength: 50,
	 		agility: 45,
	 		vitality: 50,
	 		intellect: 100
	 	}
 	]
	db.collection('playerstats',function(err, collection){
 		collection.insert(playerStat, {safe:true},function(err,result){
 			console.log("Player Stats Added");
 			callback();
 		});
 	});
 }