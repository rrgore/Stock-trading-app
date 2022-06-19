package com.example.demo.repository;

import com.example.demo.models.Action;
import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {
    @Query("SELECT a FROM Action a WHERE a.userId = ?1")
    Optional<List<Action>> findActionsByUserid(Long userid);
}
