package com.library.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.library.backend.model.Reservation;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	List<Reservation> findByUserEmail(String email);
	List<Reservation> findByBookId(Long bookId);
}