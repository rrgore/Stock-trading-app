import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { getPortfolioData, getAllStocksData, postAction } from "../services/DataSvc";
import { useNavigate } from "react-router-dom";


const cookies = new Cookies();


const UserHome = () => {
    const [stockList, setStockList] = useState(null);
    const navigate = useNavigate();
    const [allStocks, setAllStocks] = useState(null);
    const accessToken = cookies.get('accessToken');

    const [buy, setBuy] = useState(false);
    const [buyName, setBuyName] = useState('');
    const [buyPrice, setBuyPrice] = useState(0);
    const [buyCount, setBuyCount] = useState(0);
    
    const [sell, setSell] = useState(false);
    const [sellName, setSellName] = useState('');
    const [sellPrice, setSellPrice] = useState(0);
    const [sellCount, setSellCount] = useState(0);

    useEffect(() => {
        if (!accessToken) {
            navigate('/');
        }
        getPortfolioData(accessToken)
        .then(resp => {
            setStockList(resp);
        });
    }, [stockList, navigate, accessToken]);

    const handleLogout = () => {
        cookies.remove('accessToken')
        navigate('/');
    }

    const handleBuyNameSelect = (e) => {
        setBuyName(e.target.value);
        const stockDetails = allStocks.filter(x => x['ticker'] === e.target.value);
        setBuyPrice(stockDetails[0].price);
    }

    const handleBuySubmit = (e) => {
        e.preventDefault();
        const data = {
            'ticker': buyName,
            'numstocks': buyCount,
            'price': buyPrice
        }
        postAction(accessToken, data)
        .then(_ => {
            setBuy(false);
        });
    }

    const handleBuyClick = (e) => {
        getAllStocksData(accessToken)
            .then(resp => {
                setAllStocks(resp);
                setSell(false);
                setTimeout(() => {
                    setBuy(true);
                }, 200);                
            });
    }

    const handleSellClick = () => {
        setBuy(false);
        setTimeout(() => {            
            setSell(true);
        }, 200);        
    }

    const handleSellNameSelect = (e) => {
        setSellName(e.target.value);
        const stockDetails = stockList.filter(x => x['ticker'] === e.target.value);
        setSellPrice(stockDetails[0].price);
    }

    const handleSellSubmit = (e) => {
        e.preventDefault();
        const data = {
            'ticker': sellName,
            'numstocks': sellCount*(-1),
            'price': sellPrice
        }
        postAction(accessToken, data)
        .then(_ => {
            setSell(false);
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
            
            <h3><center>Portfolio</center></h3>
            <div className="row">
                <div className="col-8">
                    {stockList && stockList.length > 0 &&
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Number of Stocks</th>
                                    <th scope="col">Current price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockList.map((entry, index) => 
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{entry.ticker}</td>
                                        <td>{entry.numStocks}</td>
                                        <td>{entry.price}</td>
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
                        <button className="btn btn-primary my-2" onClick={handleBuyClick}> Buy stocks </button>
                    </div>
                    <div className="row">
                        <button className="btn btn-primary my-2" onClick={handleSellClick}> Sell stocks </button>
                    </div>

                    {buy && 
                        <form className="mt-4" onSubmit={handleBuySubmit}>
                            <label htmlFor="name">Name: </label>
                            <select id="name" name="name" onChange={handleBuyNameSelect}>
                                <option value="">-- Choose a stock --</option>
                                {allStocks.map(entry => 
                                    <option value={entry.ticker}>{entry.ticker}</option>
                                )}
                            </select>

                            <p>Price: {buyPrice}</p>

                            <label htmlFor="count">Number: </label>
                            <input type="number" id="count" name="count" onChange={(e) => {setBuyCount(e.target.value)}}></input>

                            <p>Total cost: {buyPrice * buyCount}</p>
                            <input type="submit" value="Submit"></input>
                        </form>
                    }

                    {sell && 
                        <form className="mt-4" onSubmit={handleSellSubmit}>
                            <label htmlFor="name">Name: </label>
                            <select id="name" name="name" onChange={handleSellNameSelect}>
                                <option value="">-- Choose a stock --</option>
                                {stockList.map(entry => 
                                    <option value={entry.ticker}>{entry.ticker}</option>
                                )}
                            </select>

                            <p>Price: {sellPrice}</p>

                            <label htmlFor="count">Number: </label>
                            <input type="number" id="count" name="count" onChange={(e) => {setSellCount(e.target.value)}}></input>

                            <p>Total cost: {sellPrice * sellCount}</p>
                            <input type="submit" value="Submit"></input>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default UserHome;