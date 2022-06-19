package com.example.demo.payload.response;

public class PortfolioResponse {
    private String ticker;
    private Integer numStocks;
    private Integer price;

    public PortfolioResponse(String ticker, Integer numStocks, Integer price) {
        this.ticker = ticker;
        this.numStocks = numStocks;
        this.price = price;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Integer getNumStocks() {
        return numStocks;
    }

    public void setNumStocks(Integer numStocks) {
        this.numStocks = numStocks;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
