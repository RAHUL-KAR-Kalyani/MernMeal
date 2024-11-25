const express = require('express');
const Orders = require('../models/Orders');
const router = express.Router();


router.post('/orderData', async (req, res) => {
	let data = req.body.order_data
	await data.splice(0, 0, { Order_date: req.body.order_date })
	console.log("1231242343242354", req.body.email)

	let eId = await Orders.findOne({ 'email': req.body.email })
	console.log(eId)
	if (eId === null) {
		try {
			console.log(data)
			console.log("1231242343242354", req.body.email)
			await Orders.create({
				email: req.body.email,
				order_data: [data]
			}).then(() => {
				res.json({ success: true })
			})
		} catch (error) {
			console.log(error.message)
			res.send("Server Error", error.message)

		}
	}

	else {
		try {
			await Orders.findOneAndUpdate({ email: req.body.email },
				{ $push: { order_data: data } }).then(() => {
					res.json({ success: true })
				})
		} catch (error) {
			console.log(error.message)
			res.send("Server Error", error.message)
		}
	}
})



router.post('/myOrderData', async (req, res) => {
	try {
		console.log(req.body.email)
		let myData = await Orders.findOne({ 'email': req.body.email })
		// console.log(eId)
		res.json({ orderData: myData })
	} catch (error) {
		res.send("Error", error.message)
	}


})

module.exports = router;


//================================================================================================================



// router.post('/orderData', async (req, res) => {
//     const { email, order_data, order_date } = req.body;

//     // Check if all required fields are provided
//     if (!email || !order_data || !order_date) {
//         return res.json({ error: 'Email, order data, and order date are required.' });
//     }

//     // Add order_date to each item in the order_data array
//     order_data.forEach(item => {
//         item.Order_date = order_date;  // Add the Order_date to each item
//     });

//     try {
//         // Check if the email already exists in the database
//         const existingOrder = await Orders.findOne({ email });

//         if (!existingOrder) {
//             // If no order exists for the given email, create a new order
//             await Orders.create({
//                 email: email,
//                 order_data: order_data,  // Use the updated order_data array with Order_date
//             });
//             return res.json({ success: true, message: 'Order created successfully' });
//         } else {
//             // If an order exists, append the new order data to the existing order
//             await Orders.findOneAndUpdate(
//                 { email: email },
//                 { $push: { order_data: { $each: order_data } } }
//             );
//             return res.json({ success: true, message: 'Order updated successfully' });
//         }
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({ error: error.message });
//     }
// });




//================================================================================================================



// router.post('/orderData', async (req, res) => {
// 	const { email, order_data, order_date } = req.body;

// 	// Check if all required fields are present
// 	if (!email || !order_data || !order_date) {
// 		return res.json({ error: 'Email, order data, and order date are required.' });
// 	}

// 	// Add order_date to each order item
// 	order_data.forEach(order => {
// 		order.Order_date = order_date;
// 	});

// 	try {
// 		let existingOrder = await Orders.findOne({ email });

// 		if (!existingOrder) {
// 			// check for user existing. If the user doesn't exist, create a new order
// 			await Orders.create({
// 				email,
// 				order_data: order_data
// 			});
// 			return res.json({ success: true, message: 'Order created successfully' });
// 		} else {
// 			// If the user exists, append the new orders to the existing ones
// 			await Orders.findOneAndUpdate(
// 				{ email },
// 				{ $push: { order_data: { $each: order_data } } }
// 			);
// 			return res.json({ success: true, message: 'Order updated successfully' });
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).json({ error: error.message });
// 	}
// });


