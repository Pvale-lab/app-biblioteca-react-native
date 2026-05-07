//  "Hooks"
// - useState: serve para criar variáveis que, quando atualizadas, recarregam a tela.
// - useCallback: serve para memorizar uma função, evitando que o app fique lento.
import React, { useState, useCallback } from 'react';
// Componentes visuais
import { View, Text, FlatList, Button } from 'react-native';
// "banco de dados" (persistência local)
import AsyncStorage from '@react-native-async-storage/async-storage';
// "Foco" 
import { useFocusEffect } from '@react-navigation/native';

// Podemos viajar para outras telas.
export default function HomeScreen({ navigation }) {
  // Cria um estado chamado (livros), que começa como um array vazio [].
  // E uma função 'setLivros' é a única forma permitida de alterar o valor de 'livros'.
  const [livros, setLivros] = useState([]);

  // carregar os livros salvos.
  const carregarLivros = async () => {
    try {
      // Tenta pegar os livros salvos no AsyncStorage usando a chave '@biblioteca_livros'.
      const livrosSalvos = await AsyncStorage.getItem('@biblioteca_livros');
      if (livrosSalvos) {
        // Pega o texto (JSON) que estava salvo, transforma de volta em um array do JavaScript e salva.
        setLivros(JSON.parse(livrosSalvos));
      }
    } catch (erro) {
      console.error(erro);
    }
  };
  // Toda vez que  o usuário voltar para essa tela, a função 'carregarLivros' será chamada para atualizar a lista de livros.
  useFocusEffect(useCallback(() => { 
    carregarLivros(); 
  }, []));

  
  const excluirLivro = async (id) => {
    // Cria um novo array de livros, filtrando o livro que tem o id igual ao que queremos excluir.
    const livrosAtualizados = livros.filter(livro => livro.id !== id);
    setLivros(livrosAtualizados);
    // Salva o novo array de livros no AsyncStorage, transformando ele em texto (JSON).
    await AsyncStorage.setItem('@biblioteca_livros', JSON.stringify(livrosAtualizados));
  };

  return (
    <View style={{ padding: 20 }}>
      <Button 
        title="Adicionar Novo Livro" 
        onPress={() => navigation.navigate('Edit')} 
      />

      <FlatList
        data={livros} 
        // Extrai a chave única de cada item da lista
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderWidth: 1 }}>
            <Text>Título: {item.titulo}</Text>
            <Text>Autor: {item.autor}</Text>
            <Text>Ano: {item.anoPublicacao}</Text>
            <Text>Disponível: {item.disponivel ? 'Sim' : 'Não'}</Text>
            
            <Button 
              title="Editar" 
              // Passa o livro atual como parâmetro.
              onPress={() => navigation.navigate('Edit', { livro: item })} 
            />
            <Button 
              title="Excluir" 
              color="red" 
              onPress={() => excluirLivro(item.id)} 
            />
          </View>
        )}
      />
    </View>
  );
}