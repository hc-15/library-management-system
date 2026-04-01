package com.library.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.library.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByEmail(String email);
}
