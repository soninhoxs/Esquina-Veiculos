ALTER TABLE veiculos
ADD COLUMN tipo_veiculo VARCHAR(50) NOT NULL DEFAULT 'CARRO',
ADD COLUMN propulsao VARCHAR(50) NOT NULL DEFAULT 'COMBUSTAO',
ADD COLUMN tem_leilao BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN origem_leilao VARCHAR(50);

CREATE INDEX idx_veiculos_tipo ON veiculos(tipo_veiculo);
CREATE INDEX idx_veiculos_propulsao ON veiculos(propulsao);
