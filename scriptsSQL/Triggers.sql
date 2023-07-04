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


-- Criação do trigger que atualiza o atributo 'aprovada' da compra
CREATE OR REPLACE FUNCTION aprovar_compra()
  RETURNS TRIGGER AS $$
BEGIN
  -- Atualiza o atributo 'aprovada' para true
  -- No caso, não foi feita a parte de inserção de dados de pagamento
  -- Esse trigger, na vida real, serviria para receber a aprovação da api do método de pagamento para aprovar a compra.
  -- Lembrando que, na vida real, compras não aprovadas também são registradas no histórico de compras
  NEW.aprovada := true;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER compra_aprovada
BEFORE INSERT ON compra
FOR EACH ROW
EXECUTE FUNCTION aprovar_compra();