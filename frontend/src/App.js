import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './screens/Home2.jsx';
import Login from './screens/Login2.jsx';
import Signup from './screens/Signup2.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './screens/MyOrder2.jsx';
// import Cart from './screens/Cart.jsx';

function App() {
	return (
		<CartProvider>
			<Router>
				<div>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/createuser" element={<Signup />} />
						<Route exact path="/myOrder" element={<MyOrder />} />
					</Routes>
				</div>
			</Router>
		</CartProvider>
	)
}

export default App
