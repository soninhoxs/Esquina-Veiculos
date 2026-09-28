ALTER TABLE veiculos
ADD COLUMN placa VARCHAR(20);

CREATE UNIQUE INDEX idx_veiculos_placa ON veiculos(placa);
