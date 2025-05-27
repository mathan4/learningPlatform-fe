import { Navigate, Outlet, useLoaderData } from 'react-router';
import NavBar from '../components/NavBarComponent';

const LayoutWrapper = () => {

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default LayoutWrapper;