import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login } from "./store/authSlice";
import {Header, Footer} from "./components";

const App = () => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then(userData => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout())
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Hi1</div>
    } else {
        return (
            <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
                <div className="w-full block">
                    <Header/>
                    <main>
                        {/* <Outlet></Outlet> */}
                        main
                    </main>
                    <Footer/>
                </div>
            </div>
        );
    }
};

export default App;
