import { Navigate, Outlet, useLoaderData } from "react-router";
import NavBar from "../components/NavBarComponent";

const DashboardWrapper = () => {

    const user = useLoaderData();

    if (!user) {
        return <Navigate to="/login" />
    }

    if (user.role === 'admin') {
        return <Navigate to="/admin/dashboard" />
    } else if (user.role === 'mentor') {
        return <Navigate to="/mentor/dashboard" />
    }

    return (
        <>
            <NavBar
                user={user}
            />
            <Outlet/>
        </>
    )
}

export default DashboardWrapper;