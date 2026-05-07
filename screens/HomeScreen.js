import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  // Busca os dados no armazenamento
  const loadBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem('@biblioteca_livros');
      if (storedBooks) setBooks(JSON.parse(storedBooks));
    } catch (error) {
      console.error(error);
    }
  };

  // Atualiza a lista toda vez que a tela é aberta
  useFocusEffect(useCallback(() => { loadBooks(); }, []));

  // Exclui um livro pelo ID
  const deleteBook = async (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    await AsyncStorage.setItem('@biblioteca_livros', JSON.stringify(updatedBooks));
  };

  return (
    <View style={{ padding: 20 }}>
      <Button 
        title="Adicionar Novo Livro" 
        onPress={() => navigation.navigate('Edit')} 
      />

      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderWidth: 1 }}>
            <Text>Título: {item.titulo}</Text>
            <Text>Autor: {item.autor}</Text>
            <Text>Ano: {item.anoPublicacao}</Text>
            <Text>Disponível: {item.disponivel ? 'Sim' : 'Não'}</Text>
            
            <Button 
              title="Editar" 
              onPress={() => navigation.navigate('Edit', { book: item })} 
            />
            <Button 
              title="Excluir" 
              color="red" 
              onPress={() => deleteBook(item.id)} 
            />
          </View>
        )}
      />
    </View>
  );
}