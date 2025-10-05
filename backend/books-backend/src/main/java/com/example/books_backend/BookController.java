package com.example.books_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend access
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // ✅ Health check
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }

    // ✅ Get books with search + pagination
    @GetMapping("/books")
    public ResponseEntity<Map<String, Object>> getBooks(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int pageSize
    ) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        Page<Book> booksPage;

        if (search != null && !search.trim().isEmpty()) {
            booksPage = bookRepository.search(search.trim(), pageable);
        } else {
            booksPage = bookRepository.findAll(pageable);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("data", booksPage.getContent());
        Map<String, Object> meta = new HashMap<>();
        meta.put("page", page);
        meta.put("pageSize", pageSize);
        meta.put("total", booksPage.getTotalElements());
        response.put("meta", meta);

        return ResponseEntity.ok(response);
    }

    // ✅ Get book by ID
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create new book
    @PostMapping("/books")
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    // ✅ Update existing book
    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setDescription(bookDetails.getDescription());
            book.setTags(bookDetails.getTags());
            Book updatedBook = bookRepository.save(book);
            return ResponseEntity.ok(updatedBook);
        }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete book by ID
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        return bookRepository.findById(id).map(book -> {
            bookRepository.delete(book);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
