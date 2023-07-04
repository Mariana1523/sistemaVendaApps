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


CREATE OR REPLACE FUNCTION registrar_modificacao()
  RETURNS TRIGGER AS $$
BEGIN
  -- Insere um novo registro na tabela de auditoria
  INSERT INTO auditoria (id, id_usuario, data_modificacao)
  VALUES (DEFAULT, NEW.id, now());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER usuario_modificado
AFTER UPDATE ON usuario
FOR EACH ROW
EXECUTE FUNCTION registrar_modificacao();


-- Criação da função para atualizar os valores de Faturamento
CREATE OR REPLACE FUNCTION atualizar_compra_usuario()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Faturamento
    SET TotalCompras = (SELECT COUNT(*) FROM compra),
        Receita = (SELECT SUM(A.valor) as Receita  FROM compra C inner join aplicativo A ON A.codapp = c.idapp);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Criação do trigger para atualizar Faturamento
CREATE TRIGGER trigger_atualizar_compra
AFTER INSERT ON compra
FOR EACH ROW
EXECUTE FUNCTION atualizar_compra_usuario();





CREATE OR REPLACE FUNCTION registrar_modificacao_aplicativo()
  RETURNS TRIGGER AS $$
BEGIN
  -- Insere um novo registro na tabela de auditoria_aplicativo
  INSERT INTO auditoria_aplicativo (id_aplicativo, data_modificacao)
  VALUES (NEW.codapp, now());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER aplicativo_modificado
AFTER UPDATE ON aplicativo
FOR EACH ROW
EXECUTE FUNCTION registrar_modificacao_aplicativo();