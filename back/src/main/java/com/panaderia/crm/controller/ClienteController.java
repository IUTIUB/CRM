package com.panaderia.crm.controller;

import com.panaderia.crm.domain.model.Cliente;
import com.panaderia.crm.domain.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteRepository clienteRepository;

    // 1. Listar todos los clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    // 2. Crear un nuevo cliente
    @PostMapping
    public Cliente guardarCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }
    
    // 3. Obtener un cliente por ID (Útil para detalles)
    @GetMapping("/{id}")
    public Cliente obtenerCliente(@PathVariable Long id) {
        return clienteRepository.findById(id).orElse(null);
    }
}