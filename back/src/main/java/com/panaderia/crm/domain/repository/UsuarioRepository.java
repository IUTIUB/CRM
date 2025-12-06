package com.panaderia.crm.domain.repository;

import com.panaderia.crm.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    
    // Este es el método nuevo que necesita tu controlador
    Optional<Usuario> findByEmail(String email);
}