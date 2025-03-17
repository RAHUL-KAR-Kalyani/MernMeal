import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const loadData = async () => {
            let response = await fetch("https://mernmeal-backend.onrender.com/api/foodData", {
                method: 'POST',
                headers: { 'Content-type': 'application/json' }
            });
            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
        };
        loadData();
    }, []);

    // 🔥 Optimized Filtering: Runs only when foodItem or search changes
    const filteredItemsByCategory = useMemo(() => {
        return foodCat.map((category) => ({
            categoryName: category.CategoryName,
            items: foodItem.filter(
                (item) =>
                    item.CategoryName === category.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
            ),
        }));
    }, [foodItem, foodCat, search]);

    return (
        <div>
            <Navbar />

            {/* Carousel */}

            <div>
                <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "2" }}>
                            <form className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                                {/* <button className="btn btn-success text-white" type="submit">Search</button> */}
                            </form>
                        </div>

                        <div className="carousel-item active">
                            <img src="https://wallpapers.com/images/hd/food-4k-anl1yr892h6ccjeb.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://wallpapers.com/images/hd/festive-indian-food-with-rice-and-chicken-i39qrhkpvunqe0hb.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://wallpapers.com/images/hd/traditional-indian-food-in-flat-lay-photograph-l808i2de2j2bacdi.jpg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* Display Food Items */}
            <div className="container">
                {filteredItemsByCategory.map(({ categoryName, items }) => (
                    <div key={categoryName} className="row mb-3">
                        <h3 className="m-3">{categoryName}</h3>
                        <hr />
                        {items.length > 0 ? (
                            items.map((filterItem) => (
                                <div key={filterItem._id} className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                                    <Card foodItem={filterItem} options={filterItem.options[0]} />
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No items found.</p>
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Home;
