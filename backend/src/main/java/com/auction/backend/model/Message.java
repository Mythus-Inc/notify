package com.auction.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "messages")
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "title", length = 100)
    private String title;

    @Column(nullable = false, name = "author")
    private String author;

    @Column(nullable = false, name = "course")
    private String course;

    @Column(nullable = false, name = "class")
    private String className;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(nullable = false, name = "data")
    private LocalDateTime data;

    @Column(nullable = false, name = "mensage")
    private String mensage;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Annex> annexes = new ArrayList<>();

    public void addAnnex(Annex annex) {
        annexes.add(annex);
        annex.setMessage(this);
    }

    public void removeAnnex(Annex annex) {
        annexes.remove(annex);
        annex.setMessage(null);
    }

    @PrePersist
    protected void onCreateTimestamp() {
        this.data = LocalDateTime.now();
    }
}
