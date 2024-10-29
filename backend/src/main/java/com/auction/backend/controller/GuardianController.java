package com.auction.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.auction.backend.model.Guardian;
import com.auction.backend.service.GuardianService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/guardian")
public class GuardianController {
    
    @Autowired
    private GuardianService guardianService;

    @GetMapping("/{id}")
    public String getGuardianById(@RequestParam Long id) {
        return guardianService.getGuardianById(id).getName();
    }

    @GetMapping
    public List<Guardian> getAllGuardians() {
        return guardianService.getAllGuardians();
    }
    
}
