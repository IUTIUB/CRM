package com.panaderia.crm.domain.repository;

import com.panaderia.crm.domain.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Aquí podrías añadir búsquedas especiales, ej: findByCif(String cif);
}