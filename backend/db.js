const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://rahulkar996:rahul123@cluster0.17pqa.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDb = async () => {

	await mongoose.connect(MONGO_URI)
	try {
		// db connection
		await mongoose.connect(MONGO_URI);
		console.log("mongodb connected successfully");

		// const fetchData = await mongoose.connection.db.collection("food_items").find({}).toArray(async function (err, data) {
		// 	const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
		// 	global.food_items = fetchData;
		// 	console.log(global.food_items);
		// })


		const fetchData = await mongoose.connection.db.collection("food_items").find({}).toArray()		
		const foodCategory=await mongoose.connection.db.collection("foodCategory").find({}).toArray()
		global.food_items = fetchData;
		// console.log(global.food_items);
		global.foodCategory = foodCategory;
		// console.log(global.foodCategory);

		




		return { fetchData, foodCategory };
	} catch (err) {
		console.log(err);
	}
}
module.exports = mongoDb;