package com.panaderia.crm.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "razon_social", nullable = false)
    private String razonSocial;

    @Column(nullable = false, unique = true)
    private String cif;

    private String telefono;
    private String email;
    private String direccion;

    @Enumerated(EnumType.STRING)
    private TipoCliente tipo; // RESTAURANTE, CAFETERIA...

    @Column(name = "fecha_alta")
    private LocalDateTime fechaAlta = LocalDateTime.now();

    private boolean activo = true;
    private String notas;
    
    // Enum interno para simplificar
    public enum TipoCliente {
        RESTAURANTE, CAFETERIA, OTRO
    }
}