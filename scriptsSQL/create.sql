CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  senha VARCHAR(255),
  email VARCHAR(255), 
  totalcompras Numeric(10,2)

);


CREATE TABLE aplicativo (
    codapp     SERIAL PRIMARY KEY,
    nome      VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    valor    NUMERIC(10,2) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
	imagem varchar(255)
);

CREATE TABLE compra (
  id SERIAL PRIMARY KEY,
  idUsuario integer,
  idApp integer,
  data_compra date DEFAULT CURRENT_DATE,
  FOREIGN KEY (idUsuario) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (idApp) REFERENCES aplicativo(codapp) ON DELETE CASCADE
);

CREATE TABLE Faturamento (
    id SERIAL PRIMARY KEY,
    TotalCompras INT,
    Receita DECIMAL(10, 2)
);

-- criar tabela auditoria com id, id_usuario e data_alteracao, sempre que alterar algum dado na tabela usuario
CREATE TABLE auditoria (
  id SERIAL PRIMARY KEY,
  id_usuario INTEGER,
  data_modificacao TIMESTAMP
);
