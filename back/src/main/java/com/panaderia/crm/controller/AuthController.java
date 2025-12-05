package com.panaderia.crm.controller;

import com.panaderia.crm.domain.dto.LoginRequest;
import com.panaderia.crm.domain.dto.RegisterRequest;
import com.panaderia.crm.domain.model.Usuario;
import com.panaderia.crm.domain.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya existe");
        }
        Usuario user = new Usuario();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRol(request.getRol());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActivo(true);
        
        usuarioRepository.save(user);
        return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Usuario user = usuarioRepository.findByEmail(request.getEmail()).orElse(null);
        
        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("name", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRol());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }
}