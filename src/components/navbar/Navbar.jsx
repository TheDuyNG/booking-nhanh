import "./Navbar.css"
import { Input } from "antd";
const { Search } = Input;


const Navbar = ({ onSearch }) => {

    return (
        <nav className="navbar">
            <div className="logo">MyApp</div>

            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>

            <div className="search-bar">
                <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
        </nav>
    )
}

export default Navbar;