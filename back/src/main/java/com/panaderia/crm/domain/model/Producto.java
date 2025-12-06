package com.panaderia.crm.domain.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre; // Ej: Barra de pan

    private String descripcion; // Ej: Harina de trigo, cocción leña

    @Column(nullable = false)
    private Double precio; // Ej: 1.20

    private Integer stock; // Ej: 50 unidades
}