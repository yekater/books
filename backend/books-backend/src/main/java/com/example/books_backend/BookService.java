package com.example.books_backend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class BookService {

    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public Page<Book> list(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return repository.findAll(pageable);
        } else {
            return repository.search(search, pageable);
        }
    }

    public Optional<Book> get(Long id) {
        return repository.findById(id);
    }

    public Book create(Book book) {
        return repository.save(book);
    }

    public Optional<Book> update(Long id, Book bookData) {
        return repository.findById(id).map(book -> {
            book.setTitle(bookData.getTitle());
            book.setDescription(bookData.getDescription());
            book.setTags(bookData.getTags());
            return repository.save(book);
        });
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
