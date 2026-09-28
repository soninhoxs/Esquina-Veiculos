package com.esquinaveiculos.coreapi.veiculo;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "veiculos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Diferentes unidades do mesmo modelo podem ter preços diferentes porque cada ID é uma unidade física do pátio
    @Column(unique = true, length = 20)
    private String placa;

    @Column(nullable = false, length = 100)
    private String marca;

    @Column(nullable = false, length = 100)
    private String modelo;

    @Column(nullable = false)
    private Integer ano;

    @Column(nullable = false, length = 50)
    private String cor;

    @Column(nullable = false)
    private Integer km;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal preco;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    private List<String> fotos;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private VeiculoStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_veiculo", nullable = false, length = 50)
    private TipoVeiculo tipoVeiculo;

    @Column(nullable = false, length = 50)
    private String propulsao; // ex: COMBUSTAO, ELETRICO, HIBRIDO, HUMANA

    @Column(name = "tem_leilao", nullable = false)
    private boolean temLeilao;

    @Enumerated(EnumType.STRING)
    @Column(name = "origem_leilao", length = 50)
    private OrigemLeilao origemLeilao;

    @CreationTimestamp
    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criadoEm;

    @UpdateTimestamp
    @Column(name = "atualizado_em", nullable = false)
    private LocalDateTime atualizadoEm;
}
