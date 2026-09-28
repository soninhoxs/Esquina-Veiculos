package com.esquinaveiculos.coreapi.veiculo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VeiculoService {

    private final VeiculoRepository veiculoRepository;

    public VeiculoService(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    @Transactional(readOnly = true)
    public List<VeiculoResponseDTO> findAll() {
        return veiculoRepository.findAll().stream()
                .map(VeiculoResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public VeiculoResponseDTO findByPlaca(String placa) {
        return veiculoRepository.findByPlaca(placa)
                .map(VeiculoResponseDTO::fromEntity)
                .orElseThrow(() -> new IllegalArgumentException("Veículo não encontrado com a placa: " + placa));
    }

    @Transactional
    public VeiculoResponseDTO create(VeiculoRequestDTO dto) {
        if (dto.placa() != null && veiculoRepository.existsByPlaca(dto.placa())) {
            throw new IllegalArgumentException("Placa já cadastrada no sistema.");
        }

        Veiculo veiculo = Veiculo.builder()
                .placa(dto.placa())
                .marca(dto.marca())
                .modelo(dto.modelo())
                .ano(dto.ano())
                .cor(dto.cor())
                .km(dto.km())
                .preco(dto.preco())
                .descricao(dto.descricao())
                .fotos(dto.fotos())
                .status(VeiculoStatus.DISPONIVEL)
                .tipoVeiculo(dto.tipoVeiculo())
                .propulsao(dto.propulsao())
                .temLeilao(dto.temLeilao())
                .origemLeilao(dto.origemLeilao())
                .build();

        return VeiculoResponseDTO.fromEntity(veiculoRepository.save(veiculo));
    }

    @Transactional
    public VeiculoResponseDTO updateStatus(String placa, VeiculoStatus novoStatus, boolean isIA) {
        Veiculo veiculo = veiculoRepository.findByPlaca(placa)
                .orElseThrow(() -> new IllegalArgumentException("Veículo não encontrado com a placa: " + placa));

        // Regra de ouro da especificação: IA não pode marcar como VENDIDO
        if (isIA && novoStatus == VeiculoStatus.VENDIDO) {
            throw new IllegalStateException("A IA não tem permissão para marcar um veículo como VENDIDO.");
        }

        veiculo.setStatus(novoStatus);
        
        // TODO: Disparar evento de auditoria no "eventos_veiculo"

        return VeiculoResponseDTO.fromEntity(veiculoRepository.save(veiculo));
    }
}
