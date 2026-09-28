package com.esquinaveiculos.coreapi.veiculo;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/veiculos")
public class VeiculoController {

    private final VeiculoService veiculoService;

    public VeiculoController(VeiculoService veiculoService) {
        this.veiculoService = veiculoService;
    }

    @GetMapping
    public ResponseEntity<List<VeiculoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(veiculoService.findAll());
    }

    @GetMapping("/{placa}")
    public ResponseEntity<VeiculoResponseDTO> buscarPorPlaca(@PathVariable String placa) {
        return ResponseEntity.ok(veiculoService.findByPlaca(placa));
    }

    @PostMapping
    public ResponseEntity<VeiculoResponseDTO> cadastrar(@RequestBody @Valid VeiculoRequestDTO request) {
        VeiculoResponseDTO response = veiculoService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{placa}/status")
    public ResponseEntity<VeiculoResponseDTO> alterarStatus(
            @PathVariable String placa,
            @RequestParam VeiculoStatus status,
            @RequestHeader(value = "X-Source", defaultValue = "FUNCIONARIO") String source) {
        
        boolean isIA = "IA".equalsIgnoreCase(source);
        return ResponseEntity.ok(veiculoService.updateStatus(placa, status, isIA));
    }
}
