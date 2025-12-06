package com.panaderia.crm.domain.repository;

import com.panaderia.crm.domain.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // No necesitamos escribir nada extra, JpaRepository ya nos da guardar, borrar y listar.
}