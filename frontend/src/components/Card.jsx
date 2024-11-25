import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

function Card({ foodItem, options }) {

    let price = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();

    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return;
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
                return;
                // console.log(data);
            }
            return;            
        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])


    return (
        <div className=''>
            <div className="card mt-3" style={{ "width": "17rem", "maxHeight": "360px" }}>

                {/* <img src="https://wallpaperboat.com/wp-content/uploads/2021/03/17/71710/breakfast-14.jpg" className="card-img-top" alt="..." /> */}
                <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <div className="container w-100 d-flex justify-content-around">
                        <select className="h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option value={i + 1} key={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                price.map((data) => {
                                    const capitalizedData = data.charAt(0).toUpperCase() + data.slice(1);
                                    return <option key={data} value={data} >{capitalizedData}</option>
                                })
                            }
                        </select>
                        <p className='d-inline h-100' >
                            ₹{finalPrice}/-
                        </p>
                    </div>
                    <hr />
                    <button type="button" className='btn btn-success justify-content-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card