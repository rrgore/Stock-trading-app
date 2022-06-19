package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

public class StockEntryRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String ticker;

    @PositiveOrZero
    private Integer price;

    @PositiveOrZero
    private Integer volume;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }
}
