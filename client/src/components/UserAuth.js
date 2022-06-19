import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginSubmit } from '../services/LoginSvc';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


const cookies = new Cookies();


const UserAuth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUserInput = (e) => {
        setUsername(e.target.value);
    }

    const handlePassInput = (e) => {
        setPassword(e.target.value);
    }

    async function onUserSubmit(e) {
        e.preventDefault();
        loginSubmit(username, password)
        .then(resp => {
            cookies.set('accessToken', resp.accessToken, { path: '/' });
            setUsername('');
            setPassword('');
            navigate('/home');
        });
    }

    return (
        <div>
            <header>
                <h1 className='my-4'><center>Trading App</center></h1>
            </header>
            <h3><center>User login</center></h3>
            <Link to='/' className="btn btn-dark align-left m-4">Back to Login home</Link>
            <form className="col-3 mx-auto" onSubmit={onUserSubmit}>
                <label className="form-label" htmlFor="username">Username</label>
                <input id="username" className="form-control" onChange={handleUserInput} value={username}/>

                <label className="form-label" htmlFor="passphrase">Password</label>
                <input id="passphrase" type="password" className="form-control" onChange={handlePassInput} value={password}/>

                <input type="submit" className="btn btn-primary my-4" value="Login" />
            </form>
        </div> 
    );
}

export default UserAuth;