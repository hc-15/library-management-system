package com.library.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.library.backend.model.Book;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByAuthorContainingIgnoreCase(String author);

    List<Book> findByCategoryContainingIgnoreCase(String category);
    
}