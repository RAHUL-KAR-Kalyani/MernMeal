const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://rahulkar996:rahul123@cluster0.17pqa.mongodb.net/gofoodmern?retryWrites=true&w=majority';


const mongoDb = async () => {

	// db connection

	await mongoose.connect(MONGO_URI)
	.then(async() => {
	    console.log("mongodb connected successfully");
	    const fetchData = await mongoose.connection.db.collection("food_items")
	    fetchData.find({}).toArray(function (err, data) {
	        if (err) console.log(err);
	        else console.log(data);
	    })
	})
	.catch((err => {
	    console.log(err);
	}))	
}

module.exports = mongoDb;