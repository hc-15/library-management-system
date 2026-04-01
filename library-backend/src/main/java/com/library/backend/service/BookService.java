package com.library.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.List;

import com.library.backend.model.Book;
import com.library.backend.model.Borrow;
import com.library.backend.model.Reservation;

import com.library.backend.repository.BookRepository;
import com.library.backend.repository.BorrowRepository;
import com.library.backend.repository.ReservationRepository;

import java.time.LocalDate;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    // ✅ BORROW BOOK
    public String borrowBook(Long bookId, String email) {
        Book book = bookRepository.findById(bookId).orElse(null);

        if (book == null) return "Book not found";

        if (book.isAvailable()) {
            book.setAvailable(false);
            bookRepository.save(book);

            Borrow borrow = new Borrow();
            borrow.setBookId(bookId);
            borrow.setUserEmail(email);
            borrow.setBorrowDate(LocalDate.now());
            borrow.setDueDate(LocalDate.now().plusDays(7));

            borrowRepository.save(borrow);

            return "Book Borrowed Successfully";
        } else {
            return "Book Not Available";
        }
    }

    // ✅ RESERVE BOOK
    public String reserveBook(Long bookId, String email) {
        Reservation res = new Reservation();
        res.setBookId(bookId);
        res.setUserEmail(email);

        reservationRepository.save(res);

        return "Book Reserved Successfully";
    }
    
    public String returnBook(Long bookId) {

        Book book = bookRepository.findById(bookId).orElse(null);

        if (book == null) return "Book not found";

        // ❌ REMOVE BORROW RECORD
        List<Borrow> borrows = borrowRepository.findAll();

        for (Borrow b : borrows) {
            if (b.getBookId().equals(bookId)) {
            	java.time.LocalDate today = java.time.LocalDate.now();
                java.time.LocalDate dueDate = b.getDueDate();

                int fine = 0;

                if (today.isAfter(dueDate)) {
                    long daysLate = java.time.temporal.ChronoUnit.DAYS.between(dueDate, today);
                    fine = (int) daysLate * 5; // ₹5 per day
                }

                b.setFine(fine);
                b.setReturned(true);   // ✅ mark as returned
               
                borrowRepository.save(b);
                break;
            }
        }

        // ✅ MAKE BOOK AVAILABLE
        book.setAvailable(true);
        bookRepository.save(book);

        // ✅ CHECK RESERVATIONS
        List<Reservation> reservations = reservationRepository.findByBookId(bookId);

        if (!reservations.isEmpty()) {
            Reservation res = reservations.get(0);

            Borrow borrow = new Borrow();
            borrow.setBookId(bookId);
            borrow.setUserEmail(res.getUserEmail());
            borrow.setBorrowDate(java.time.LocalDate.now());
            borrow.setDueDate(java.time.LocalDate.now().plusDays(7));

            borrowRepository.save(borrow);

            reservationRepository.delete(res);

            book.setAvailable(false);
            bookRepository.save(book);

            return "Book assigned to next reserved user";
        }

        return "Book returned successfully";
    }

    // ✅ SEARCH BOOKS
    public List<Book> searchBooks(String keyword) {
        Set<Book> result = new HashSet<>();

        result.addAll(bookRepository.findByTitleContainingIgnoreCase(keyword));
        result.addAll(bookRepository.findByAuthorContainingIgnoreCase(keyword));
        result.addAll(bookRepository.findByCategoryContainingIgnoreCase(keyword));

        return new ArrayList<>(result);
    }
    
 // ✅ GET BORROWED BOOKS BY USER
    public List<Borrow> getBorrowedBooks(String email) {
        return borrowRepository.findByUserEmail(email);
    }

    // ✅ GET RESERVED BOOKS BY USER
    public List<Reservation> getReservedBooks(String email) {
        return reservationRepository.findByUserEmail(email);
    }
    // ✅ GET ALL BOOKS
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    public List<Borrow> getActiveBorrows(String email) {

        List<Borrow> borrows = borrowRepository
                .findByUserEmailIgnoreCaseAndReturnedFalse(email);

        LocalDate today = LocalDate.now();

        for (Borrow b : borrows) {

            if (b.getDueDate() != null && today.isAfter(b.getDueDate())) {

                long daysLate = java.time.temporal.ChronoUnit.DAYS
                        .between(b.getDueDate(), today);

                int fine = (int) daysLate * 5;

                b.setFine(fine);

                borrowRepository.save(b); // optional but good
            }
        }

        return borrows;
    }
}