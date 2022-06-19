package com.example.demo.models;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;

@Entity
@Table (name = "actions",
        uniqueConstraints = {
        })
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @PositiveOrZero
    private Long stockId;

    @PositiveOrZero
    private Long userId;

    private Integer numStocks;

    @PositiveOrZero
    private Integer price;

    private LocalDateTime timeStamp;

    public Action() {}

    public Action(Long stockId, Long userId, Integer numStocks, Integer buyingPrice, LocalDateTime timeStamp) {
        this.stockId = stockId;
        this.userId = userId;
        this.numStocks = numStocks;
        this.price = buyingPrice;
        this.timeStamp = timeStamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStockId() {
        return stockId;
    }

    public void setStockId(Long stockId) {
        this.stockId = stockId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Override
    public String toString() {
        return "Action{" +
                "id=" + id +
                ", stockId=" + stockId +
                ", userId=" + userId +
                ", numStocks=" + numStocks +
                ", buyingPrice=" + price +
                ", timeStamp=" + timeStamp +
                '}';
    }
}