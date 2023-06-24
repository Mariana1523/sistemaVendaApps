select * from usuario;

alter table usuario
add email varchar(100);

drop table usuario;

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  senha VARCHAR(255),
  email VARCHAR(255)
);
INSERT INTO usuario (nome, senha, email) VALUES ('John Doe', 'senha123', 'john@example.com');

CREATE TABLE aplicativo (
    codapp     SERIAL PRIMARY KEY,
    nome      VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    preco    VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
	imagem varchar(255)
);

select * from aplicativo;
