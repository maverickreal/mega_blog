import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const authStatus = useSelector(state => state.auth.status);
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];
    const navigate = useNavigate();

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav>
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map(navItem => {
                            if (navItem.active) {
                                return (
                                    <li key={navItem.name}>
                                        <button onClick={() => navigate(navItem.slug)}>
                                            {navItem.name}
                                        </button>
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
