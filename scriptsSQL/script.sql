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
    preco    VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
	imagem varchar(255)
);

INSERT INTO aplicativo 
VALUES (1, 'Cura e Cia', 
		'Um aplicativo focado na saúde e bem-estar, oferecendo recursos como monitoramento de atividades físicas, acompanhamento de dieta, lembretes de medicamentos, acesso a dicas de saúde, orientações de exercícios e recursos de meditação.',
		'R$5.800,00',
		'Saúde e bem-estar',
		'https://i.ibb.co/fCZk6Mh/saude.png'
	   );
	   
INSERT INTO aplicativo 
VALUES (2, 'Shopping', 
		'Um aplicativo que oferece descontos e ofertas especiais em produtos e serviços locais. Os usuários podem encontrar ofertas exclusivas em restaurantes, spas, academias, cinemas e outros estabelecimentos próximos a eles.',
		'R$7.200,00',
		'Compras coletivas',
		'https://i.ibb.co/SNGNXLt/vendas.png'
	   );
	   
INSERT INTO aplicativo 
VALUES (3, 'Panem Finanças', 
		'Um aplicativo que ajuda os usuários a gerenciarem suas finanças pessoais, fornecendo recursos como rastreamento de despesas, orçamentação, lembretes de contas a pagar, análises de gastos, dicas de economia e investimento.',
		'R$9.990,00',
		'Finanças',
		'https://i.ibb.co/c1vLLqb/financas.png'
	   );
	   
INSERT INTO aplicativo 
VALUES (4, 'Fast Chat', 
		'Projetado para facilitar a comunicação e a colaboração entre equipes e departamentos dentro de uma empresa. Pode incluir recursos como chat em grupo, compartilhamento de arquivos, gerenciamento de tarefas, calendários compartilhados e videoconferências.',
		'R$12.300,00',
		'Comunicação empresarial',
		'https://i.ibb.co/zJ8KB9y/chat.png'
	   );

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
