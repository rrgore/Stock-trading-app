package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

public class ActionRequest {
    @NotBlank
    private String ticker;

    // Negative => Sell, positive => buy
    private Integer numstocks;

    @PositiveOrZero
    private Integer price;

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Integer getNumstocks() {
        return numstocks;
    }

    public void setNumstocks(Integer numstocks) {
        this.numstocks = numstocks;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
