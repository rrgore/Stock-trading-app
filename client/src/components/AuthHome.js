import { Link } from "react-router-dom";

const AuthHome = () => {
    return (
        <div>
            <header>
                <h1 className='my-4'>Trading App</h1>
            </header>
            <Link to="/admin-login" className="btn btn-primary m-1">Login as admin</Link> <br/>
            <Link to="/user-login" className="btn btn-primary m-1">Login as user</Link>
        </div>
    );
}

export default AuthHome;