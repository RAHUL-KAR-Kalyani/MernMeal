import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
	const [orderData, setOrderData] = useState(null); // 🔥 Default null rakho
	const [loading, setLoading] = useState(true); // 🔥 Loading state add kiya

	const fetchMyOrder = async () => {
		try {
			const response = await fetch("https://mernmeal-backend.onrender.com/api/myOrderData", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: localStorage.getItem("userEmail"),
				}),
			});

			const data = await response.json();
			setOrderData(data);
		} catch (error) {
			console.error("Error fetching orders:", error);
		} finally {
			setLoading(false); // ✅ Jaise hi data aaye, loading false karo
		}
	};

	useEffect(() => {
		fetchMyOrder();
	}, []);

	return (
		<div>
			<Navbar />

			<div className="container">
				<h2 className="my-4">My Orders</h2>

				{/* ✅ Loader Show Jab Tak Data Aaye */}
				{loading ? (
					<p>Loading your orders...</p>
				) : orderData && orderData.orderData ? (
					orderData.orderData.order_data.slice(0).reverse().map((item, index) => (
						<div key={index}>
							{item.map((arrayData, idx) => (
								<div key={idx}>
									{/* ✅ Date Row */}
									{arrayData.Order_date ? (
										<div className="m-auto mt-5">
											<h4>{arrayData.Order_date}</h4>
											<hr />
										</div>
									) : (
										<div className="col-12 col-md-6 col-lg-3">
											<div className="card mt-3">
												<div className="card-body">
													<h5 className="card-title">{arrayData.name}</h5>
													<div className="container w-100 p-0" style={{ height: "38px" }}>
														<span className="m-1 text-capitalize">Qty: {arrayData.qty}</span>
														<span className="m-1 text-capitalize">Size: {arrayData.size}</span>
														<div className="d-inline ms-2 h-100 w-20 fs-5">
															₹{arrayData.price}/-
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					))
				) : (
					<p>No orders found.</p>
				)}
			</div>

			<Footer />
		</div>
	);
}
