package com.example.demo.repository;

import com.example.demo.models.Stock;
import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long>  {
    Optional<Stock> findByTicker(String ticker);
    Boolean existsByTicker(String ticker);
}
