import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({
    children,
    authentication = true
}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authState = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authState !== authentication) {
            navigate(authentication ? "/login" : "/");
        }
        setLoader(false);
    }, [authState, authentication, navigate]);

    return (
        loader ? (<h1>Loading...</h1>) : (<>{children}</>)
    );
}

export default Protected;
