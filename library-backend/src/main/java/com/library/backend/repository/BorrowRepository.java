package com.library.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import com.library.backend.model.Borrow;
import java.util.List;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {

    List<Borrow> findByUserEmail(String email);
    @Transactional
    void deleteByBookId(Long bookId);
    List<Borrow> findByUserEmailIgnoreCaseAndReturnedFalse(String email);
}