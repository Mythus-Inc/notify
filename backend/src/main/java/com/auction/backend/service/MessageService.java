package com.auction.backend.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.auction.backend.model.Annex;
import com.auction.backend.model.Message;
import com.auction.backend.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message create(Message message, List<MultipartFile> files) {
        for (MultipartFile file : files) {
            Annex annex = createAnnex(file);
            message.addAnnex(annex);
        }
        return messageRepository.save(message);
    }

    public Message update(Message message, List<MultipartFile> newFiles) {
        Message messageSaved = messageRepository.findById(message.getId())
            .orElseThrow(() -> new RuntimeException("Message not found"));

        messageSaved.setTitle(message.getTitle());
        messageSaved.setAuthor(message.getAuthor());
        messageSaved.setCategory(message.getCategory());
        messageSaved.setRecipient(message.getRecipient());
        messageSaved.setMessage(message.getMessage());
        messageSaved.setDate(message.getDate());

        if (newFiles != null && !newFiles.isEmpty()) {

            for (MultipartFile file : newFiles) {
                Annex annex = createAnnex(file);
                messageSaved.addAnnex(annex);
            }
        }

        return messageRepository.save(messageSaved);
    }

    public void delete(Long id) {
        messageRepository.deleteById(id);
    }

    public Message findById(Long id) {
        return messageRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Message not found"));
    }

    public Iterable<Message> findAll() {
        return messageRepository.findAll();
    }

    private Annex createAnnex(MultipartFile file) {
        String uploadDir = "/uploads/";
        String filePath = uploadDir + file.getOriginalFilename();
        
        File destinationFile = new File(filePath);
        try {
            file.transferTo(destinationFile);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar arquivo", e);
        }

        Annex annex = new Annex();
        annex.setName(file.getOriginalFilename());
        annex.setPath(filePath); 
        annex.setType(file.getContentType());
        annex.setSize(file.getSize());

        return annex;
    }
}
