package com.example.demo.controllers;

import com.example.demo.models.Action;
import com.example.demo.models.Stock;
import com.example.demo.models.User;
import com.example.demo.payload.request.ActionRequest;
import com.example.demo.payload.request.StockEntryRequest;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.payload.response.PortfolioResponse;
import com.example.demo.repository.ActionRepository;
import com.example.demo.repository.StockRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/stocks")
public class StockController {
    @Autowired
    StockRepository stockRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ActionRepository actionRepository;

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Stock> allAccess() {
        return stockRepository.findAll();
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> userAccess() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userDetails.getUsername()));
        Long userid = user.getId();
        List<Action> actionsList = actionRepository.findActionsByUserid(userid)
                .orElseThrow(() -> new UsernameNotFoundException("Actions Not Found for username: " + userDetails.getUsername()));
        HashMap<Long, Integer> stockIdToNumber = new HashMap<>();
        for (Action a : actionsList) {
            if (stockIdToNumber.containsKey(a.getStockId())) {
                int curr = stockIdToNumber.get(a.getStockId());
                stockIdToNumber.put(a.getStockId(), curr + a.getNumStocks());
            } else {
                stockIdToNumber.put(a.getStockId(), a.getNumStocks());
            }
        }

        List<PortfolioResponse> portfolioList = new ArrayList<>();
        for (Map.Entry<Long, Integer> entry : stockIdToNumber.entrySet()) {
            if (entry.getValue() > 0) {
                Stock stock = stockRepository.findById(entry.getKey())
                        .orElseThrow(() -> new UsernameNotFoundException("Actions Not Found for username: " + userDetails.getUsername()));
                portfolioList.add(new PortfolioResponse(stock.getTicker(), entry.getValue(), stock.getPrice()));
            }
        }

        return ResponseEntity.ok(portfolioList);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @PostMapping("/entry")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addStockEntry(@Valid @RequestBody StockEntryRequest stockEntryRequest) {
        if (stockRepository.existsByTicker(stockEntryRequest.getTicker())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Stock already exists!"));
        }

        // Create a new stock
        Stock stock = new Stock(
                stockEntryRequest.getName(),
                stockEntryRequest.getTicker(),
                stockEntryRequest.getPrice(),
                stockEntryRequest.getVolume()
        );

        stockRepository.save(stock);

        return ResponseEntity.ok(new MessageResponse("Stock "+stockEntryRequest.getTicker()+" added to the database successfully!"));
    }

    @PostMapping("/action")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addActionEntry(@Valid @RequestBody ActionRequest actionRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userDetails.getUsername()));
        Long userId = user.getId();

        String ticker = actionRequest.getTicker();
        Stock stock = stockRepository.findByTicker(ticker)
                .orElseThrow(() -> new UsernameNotFoundException("Stock Not Found with username: " + ticker));
        Long stockId = stock.getId();

        // Create a new stock
        Action action = new Action(
                stockId,
                userId,
                actionRequest.getNumstocks(),
                actionRequest.getPrice(),
                LocalDateTime.now()
        );

        actionRepository.save(action);

        return ResponseEntity.ok(new MessageResponse("Portfolio updated: Stock name = "+ticker+"; Quantity = "+actionRequest.getNumstocks()));
    }
}
