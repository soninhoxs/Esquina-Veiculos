package com.esquinaveiculos.coreapi.veiculo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record VeiculoResponseDTO(
    UUID id,
    String placa,
    String marca,
    String modelo,
    Integer ano,
    String cor,
    Integer km,
    BigDecimal preco,
    String descricao,
    List<String> fotos,
    VeiculoStatus status,
    TipoVeiculo tipoVeiculo,
    String propulsao,
    boolean temLeilao,
    OrigemLeilao origemLeilao,
    LocalDateTime criadoEm,
    LocalDateTime atualizadoEm
) {
    public static VeiculoResponseDTO fromEntity(Veiculo veiculo) {
        return new VeiculoResponseDTO(
            veiculo.getId(),
            veiculo.getPlaca(),
            veiculo.getMarca(),
            veiculo.getModelo(),
            veiculo.getAno(),
            veiculo.getCor(),
            veiculo.getKm(),
            veiculo.getPreco(),
            veiculo.getDescricao(),
            veiculo.getFotos(),
            veiculo.getStatus(),
            veiculo.getTipoVeiculo(),
            veiculo.getPropulsao(),
            veiculo.isTemLeilao(),
            veiculo.getOrigemLeilao(),
            veiculo.getCriadoEm(),
            veiculo.getAtualizadoEm()
        );
    }
}
