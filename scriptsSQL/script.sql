

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







-- criar tabela auditoria com id, id_usuario e data_alteracao, sempre que alterar algum dado na tabela usuario
CREATE TABLE auditoria (
  id SERIAL PRIMARY KEY,
  id_usuario INTEGER,
  data_modificacao TIMESTAMP
);



CREATE TRIGGER usuario_modificado
AFTER UPDATE ON usuario
FOR EACH ROW
EXECUTE FUNCTION registrar_modificacao();