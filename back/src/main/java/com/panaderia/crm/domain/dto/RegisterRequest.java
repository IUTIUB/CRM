package com.panaderia.crm.domain.dto;

import com.panaderia.crm.domain.model.Rol;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String nombre;
    private String apellido;
    private Rol rol;
}