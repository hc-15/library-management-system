package com.library.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.library.backend.model.Book;
import com.library.backend.model.Borrow;
import com.library.backend.model.Reservation;
import com.library.backend.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String keyword) {
        return bookService.searchBooks(keyword);
    }

    @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }
    
    @PostMapping("/borrow")
    public String borrowBook(@RequestParam Long bookId, @RequestParam String email) {
        return bookService.borrowBook(bookId, email);
    }

    @PostMapping("/reserve")
    public String reserveBook(@RequestParam Long bookId, @RequestParam String email) {
        return bookService.reserveBook(bookId, email);
    }
    
    @PostMapping("/return")
    public String returnBook(@RequestParam Long bookId) {
        return bookService.returnBook(bookId);
    }
    
    @GetMapping("/borrowed")
    public List<Borrow> getBorrowed(@RequestParam String email) {
        return bookService.getBorrowedBooks(email);
    }

    @GetMapping("/reserved")
    public List<Reservation> getReserved(@RequestParam String email) {
        return bookService.getReservedBooks(email);
    }
    
    @GetMapping("/my-books")
    public List<Borrow> getMyBooks(@RequestParam String email) {
        return bookService.getActiveBorrows(email);
    }
}