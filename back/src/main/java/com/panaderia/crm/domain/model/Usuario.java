package com.panaderia.crm.domain.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    // --- NUEVOS CAMPOS NECESARIOS ---
    @Column(nullable = false, unique = true)
    private String email;

    private boolean activo;
    // --------------------------------

    private String nombre;
    private String apellido;

    @Enumerated(EnumType.STRING)
    private Rol rol;
}