import { Navigate, Outlet, useLoaderData } from 'react-router';
import NavBar from '../components/NavBarComponent';

const LayoutWrapper = () => {

    const user = useLoaderData();

    if (user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin/dashboard" />
        } else if (user.role === 'user') {
            return <Navigate to="/dashboard" />
        } else if (user.role === 'mentor') {
            return <Navigate to="/mentor/dashboard" />
        }
    }

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default LayoutWrapper;