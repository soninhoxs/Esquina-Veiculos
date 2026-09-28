package com.esquinaveiculos.coreapi.veiculo;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public record VeiculoRequestDTO(
    @NotBlank String marca,
    @NotBlank String modelo,
    String placa,
    @NotNull Integer ano,
    @NotBlank String cor,
    @NotNull @Min(0) Integer km,
    @NotNull @Min(0) BigDecimal preco,
    String descricao,
    List<String> fotos,
    @NotNull TipoVeiculo tipoVeiculo,
    @NotBlank String propulsao,
    @NotNull Boolean temLeilao,
    OrigemLeilao origemLeilao
) {}
