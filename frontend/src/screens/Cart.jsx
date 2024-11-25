import React from 'react'
import { Trash } from 'react-bootstrap-icons'
import { useCart, useDispatchCart } from '../components/ContextReducer'

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();
    const sadEmoji="https://png.pngtree.com/png-vector/20221110/ourmid/pngtree-yellow-sad-emoji-design-with-big-glassy-eyes-png-image_6432751.png"
    if (data.length === 0) {
        return (
            <div className=''>
                <div className='m-5 w-auto text-center fs-1 '>The Cart is Empty! 
                    <img src={sadEmoji} alt='' className="card-img-top" style={{ height: "100px", width: "100px", objectFit: "fill" }}/></div>
            </div>
        )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("https://mernmeal-backend.onrender.com/api/orderData", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ order_data: data, email: userEmail, order_date: new Date().toDateString() })
        });
        console.log("order response: ", response)
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>

            {console.log(data)}

            <div className='container table-responsive-sm table-responsive-md table-custom '>
                <div className="table-wrapper" style={{ maxHeight: '400px', overflowY: 'auto'}}>
                    <table className='table table-hover'>
                        <thead className='text-success fs-4 w-100' style={{ position: 'sticky', top: 0, backgroundColor: '#222222', zIndex: 1 }}>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Option</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((food, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td className='text-capitalize'>{food.name}</td>
                                    <td className='text-capitalize'>{food.qty}</td>
                                    <td className='text-capitalize'>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button type="button" className="btn p-0">
                                            <Trash onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='mt-2'>
                    <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
                </div>
                <div className='mt-1'>
                    <button className='btn bg-success' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>


            {/* <div className='container table-responsive-sm table-responsive-md'>
                <div className="table-wrapper border border-danger">
                    <table className='table table-hover'>
                        <thead className='text-success fs-4 w-100' style={{ display: 'block' }}>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Option</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody className='w-100' style={{ maxHeight: '400px', overflowY: 'auto', display: 'block', height: '400px', overflowX: 'hidden' }}>
                            {data.map((food, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button type="button" className="btn p-0">
                                            <Trash onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='mt-3'>
                    <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
                </div>
                <div className='m-0 p-0 border border-danger'>
                    <button className='btn bg-success' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div> */}






        </div>
    )
}

export default Cart