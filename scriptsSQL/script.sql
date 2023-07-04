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

INSERT INTO usuario (nome, senha, email) VALUES ('vitao', '11223344', 'victorperial@hotmail.com');

CREATE TABLE aplicativo (
    codapp     SERIAL PRIMARY KEY,
    nome      VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    valor    NUMERIC(10,2) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
	imagem varchar(255)
);

INSERT INTO aplicativo 
VALUES (1, 'Cura e Cia', 
		'Um aplicativo focado na saúde e bem-estar, oferecendo recursos como monitoramento de atividades físicas, acompanhamento de dieta, lembretes de medicamentos, acesso a dicas de saúde, orientações de exercícios e recursos de meditação.',
		5800.00,
		'Saúde e bem-estar',
		'https://i.ibb.co/fCZk6Mh/saude.png'
	   );
	   
INSERT INTO aplicativo 
VALUES (2, 'Shopping', 
		'Um aplicativo que oferece descontos e ofertas especiais em produtos e serviços locais. Os usuários podem encontrar ofertas exclusivas em restaurantes, spas, academias, cinemas e outros estabelecimentos próximos a eles.',
		 7200.00,
		'Compras coletivas',
		'https://i.ibb.co/SNGNXLt/vendas.png');
	   
INSERT INTO aplicativo 
VALUES (3, 'Panem Finanças', 
		'Um aplicativo que ajuda os usuários a gerenciarem suas finanças pessoais, fornecendo recursos como rastreamento de despesas, orçamentação, lembretes de contas a pagar, análises de gastos, dicas de economia e investimento.',
		9990.00,
		'Finanças',
		'https://i.ibb.co/c1vLLqb/financas.png');
	   
INSERT INTO aplicativo 
VALUES (4, 'Fast Chat', 
		'Projetado para facilitar a comunicação e a colaboração entre equipes e departamentos dentro de uma empresa. Pode incluir recursos como chat em grupo, compartilhamento de arquivos, gerenciamento de tarefas, calendários compartilhados e videoconferências.',
		12300.00,
		'Comunicação empresarial',
		'https://i.ibb.co/zJ8KB9y/chat.png');

select * from usuario;
select * from aplicativo;


CREATE TABLE contato
(
    id SERIAL PRIMARY KEY,
    nome  varchar(30),
    sobrenome  varchar(50),
    email  varchar(255),
    celular varchar(30),
    mensagem TEXT
);

alter table usuario
add isadmin boolean  
select * from usuario


CREATE TABLE compra (
  id SERIAL PRIMARY KEY,
  idUsuario integer,
  idApp integer,
  data_compra date DEFAULT CURRENT_DATE,
  FOREIGN KEY (idUsuario) REFERENCES usuario(id),
  FOREIGN KEY (idApp) REFERENCES aplicativo(codapp)
);

-- pesquisas no banco de dados

-- numero total de compras
SELECT COUNT(*) AS quantidade_compras FROM compra;

-- soma total dos valores das compras
SELECT SUM(valor) AS valor_total_compras FROM compra;

-- quantidade de compras por usuário
SELECT u.nome AS nome_usuario, COUNT(c.id) AS quantidade_compras, SUM(c.valor) AS valor_total_compras
FROM usuario uma
LEFT JOIN compra c ON u.id = c.idUsuario
GROUP BY u.id, u.nome;

-- valor medio das compras por usuário
SELECT u.id, u.nome, AVG(c.valor) AS valor_medio_compras
FROM usuario u
LEFT JOIN compra c ON u.id = c.idUsuario
GROUP BY u.id, u.nome;

-- Top 2 aplicativos mais populares com base no número de compras:
SELECT a.nome, COUNT(c.id) AS numero_compras
FROM aplicativo a
LEFT JOIN compra c ON a.codapp = c.idApp
GROUP BY a.codapp, a.nome
ORDER BY numero_compras DESC
LIMIT 2;

-- Valor total de compras por categoria de aplicativo:
SELECT a.categoria, SUM(c.valor) AS valor_total_compras
FROM compra c
JOIN aplicativo a ON c.idApp = a.codapp
GROUP BY a.categoria;

-- Número de compras por mês:
SELECT DATE_TRUNC('month', data_compra) AS mes, COUNT(*) AS numero_compras
FROM compra
GROUP BY mes
ORDER BY mes;

-- Lista de usuários que compraram pelo menos um aplicativo da categoria "Finanças":
SELECT nome
FROM usuario
WHERE id IN (
    SELECT idUsuario
    FROM compra
    WHERE idApp IN (
        SELECT codapp
        FROM aplicativo
        WHERE categoria = 'Finanças'
    )
);


CREATE TABLE Faturamento (
    id SERIAL PRIMARY KEY,
    TotalCompras INT,
    Receita DECIMAL(10, 2)
);



-- Criação da função para atualizar os valores de Faturamento
CREATE OR REPLACE FUNCTION atualizar_faturamento()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Faturamento
    SET TotalCompras = (SELECT COUNT(*) FROM compra),
        Receita = (SELECT SUM(A.valor) as Receita  FROM compra C inner join aplicativo A ON A.codapp = c.idapp);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Criação do trigger para atualizar Faturamento
CREATE TRIGGER trigger_atualizar_faturamento
AFTER INSERT ON compra
FOR EACH ROW
EXECUTE FUNCTION atualizar_faturamento();

ALTER TABLE usuario ADD totalCompras float DEFAULT 0;


update usuario
set totalcompras =0;
insert into compra(idusuario, idapp)
values (1,2);

CREATE OR REPLACE FUNCTION atualizar_totalCompras()
RETURNS TRIGGER AS
$$
BEGIN
    UPDATE Usuario
    SET totalcompras = totalcompras + (
        SELECT preco
        FROM Aplicativo
        WHERE codapp = NEW.idapp
    )
    WHERE id = NEW.idusuario;
    
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_atualizar_totalCompras
AFTER INSERT ON Compra
FOR EACH ROW
EXECUTE FUNCTION atualizar_totalCompras();



-- Criação da função para atualizar os valores de Faturamento
