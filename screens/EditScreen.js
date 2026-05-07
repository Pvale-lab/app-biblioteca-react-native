import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditScreen({ route, navigation }) {
 
  // Pega o livro que foi passado como parâmetro (se houver).
  const livroParaEditar = route.params?.livro;

  
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [disponivel, setDisponivel] = useState(true);

  useEffect(() => {
    if (livroParaEditar) {
      setTitulo(livroParaEditar.titulo);
      setAutor(livroParaEditar.autor);
      setAnoPublicacao(livroParaEditar.anoPublicacao);
      setDisponivel(livroParaEditar.disponivel);
    }
  }, [livroParaEditar]);

  // Função chamada quando o usuário clica em "Salvar Livro".
  const salvarLivro = async () => {
    if (!titulo || !autor || !anoPublicacao) {
      Alert.alert('Erro', 'Preencha todos os campos de texto!');
      return;
    }
    
    try {
      const livrosSalvos = await AsyncStorage.getItem('@biblioteca_livros');
      // Se já houver livros salvos, transforma o texto (JSON) de volta em um array do JavaScript. Caso contrário, começa com um array vazio.
      let listaDeLivros = livrosSalvos ? JSON.parse(livrosSalvos) : [];

      
      if (livroParaEditar) {
        listaDeLivros = listaDeLivros.map(livro =>
          livro.id === livroParaEditar.id
            ? { ...livro, titulo, autor, anoPublicacao, disponivel }
            : livro
        );
      } else {
        listaDeLivros.push({
          id: Date.now().toString(),
          titulo, 
          autor, 
          anoPublicacao, 
          disponivel
        });
      }

      // Salva a lista atualizada de livros no AsyncStorage, transformando o array em texto (JSON).
      await AsyncStorage.setItem('@biblioteca_livros', JSON.stringify(listaDeLivros));
      navigation.goBack(); 

    } catch (erro) {
      console.error(erro);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Título:</Text>
      <TextInput 
        style={{ borderWidth: 1, marginBottom: 10 }} 
        value={titulo} 
        onChangeText={setTitulo} 
      />

      <Text>Autor:</Text>
      <TextInput 
        style={{ borderWidth: 1, marginBottom: 10 }} 
        value={autor} 
        onChangeText={setAutor} 
      />

      <Text>Ano de Publicação:</Text>
      <TextInput 
        style={{ borderWidth: 1, marginBottom: 10 }} 
        value={anoPublicacao} 
        onChangeText={setAnoPublicacao} 
        keyboardType="numeric" 
      />

      <Text>Disponível para empréstimo?</Text>
      <Switch 
        value={disponivel} 
        onValueChange={setDisponivel} 
      />

      <View style={{ marginTop: 20 }}>
        {/* Atualizamos a chamada no botão */}
        <Button title="Salvar Livro" onPress={salvarLivro} />
      </View>
    </View>
  );
}