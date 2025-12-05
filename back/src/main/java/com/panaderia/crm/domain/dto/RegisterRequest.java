package com.panaderia.crm.domain.dto;
import com.panaderia.crm.domain.model.Usuario.Rol;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Rol rol;
}