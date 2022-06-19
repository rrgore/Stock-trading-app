import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { getAllStocksData } from "../services/DataSvc";
import { useNavigate } from "react-router-dom";
import { postEntry } from "../services/DataSvc";


const cookies = new Cookies();


const AdminHome = () => {
    const [stockList, setStockList] = useState(null);
    const navigate = useNavigate();
    const accessToken = cookies.get('accessToken');

    const [add, setAdd] = useState(false);
    const [addName, setAddName] = useState('');
    const [addTicker, setAddTicker] = useState('');
    const [addPrice, setAddPrice] = useState(0);
    const [addVolume, setAddVolume] = useState(0);

    useEffect(() => {        
        if (!accessToken) {
            navigate('/');
        }
        getAllStocksData(accessToken)
        .then(resp => {
            setStockList(resp);
        });
    }, [stockList, navigate, accessToken]);

    const handleLogout = () => {
        cookies.remove('accessToken')
        navigate('/');
    }

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const data = {
            'name': addName,
            'ticker': addTicker,
            'price': addPrice,
            'volume': addVolume
        }
        postEntry(accessToken, data)
        .then(_ => {
            setAdd(false);
        });
    }

    return (
        <div className="container my-4">
            <div className="row my-4">
                <div className="col-4 offset-4">
                    <h1><center>Trading App</center></h1>                    
                </div>
                <div className="col-1 offset-3">
                    <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
                </div>                
            </div>
            
            <h3><center>Admin</center></h3>
            <div className="row">
                <div className="col-8">
                    {stockList && stockList.length > 0 &&
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Current price</th>
                                    <th scope="col">Volume</th>
                                    <th scope="col">Market Cap</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockList.map((entry, index) => 
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{entry.ticker}</td>
                                        <td>{entry.price}</td>
                                        <td>{entry.volume}</td>
                                        <td>{entry.volume * entry.price}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>                            
                    }
                    {stockList && stockList.length <= 0 && 
                        <p>No items exist in your portfolio</p>
                    }
                </div>
                <div className="col-3 offset-1">
                    <div className="row">
                        <button className="btn btn-primary my-2" onClick={_ => setAdd(true)}> Add new stock </button>
                    </div>

                    {add && 
                        <form className="mt-4" onSubmit={handleAddSubmit}>
                            <label htmlFor="name">Name: </label>
                            <input id="name" name="name" className="my-1" onChange={e => setAddName(e.target.value)}></input>

                            <label htmlFor="ticker">Ticker symbol: </label>
                            <input id="ticker" name="ticker" className="my-1" onChange={e => setAddTicker(e.target.value)}></input>

                            <label htmlFor="price">Initial price: </label>
                            <input type="number" id="price" name="price" className="my-1" onChange={(e) => {setAddPrice(e.target.value)}}></input>

                            <label htmlFor="volume">Volume: </label>
                            <input type="number" id="volume" name="volume" className="my-1" onChange={(e) => {setAddVolume(e.target.value)}}></input>

                            <input type="submit" value="Submit" className="my-1"></input>
                        </form>
                    }                       
                </div>
            </div>

            
        </div>
    );
}

export default AdminHome;