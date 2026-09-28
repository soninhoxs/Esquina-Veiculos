CREATE TABLE veiculos (
    id UUID PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(50) NOT NULL,
    km INT NOT NULL,
    preco DECIMAL(15, 2) NOT NULL,
    descricao TEXT,
    fotos TEXT[], 
    status VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_veiculos_status ON veiculos(status);
CREATE INDEX idx_veiculos_marca ON veiculos(marca);
