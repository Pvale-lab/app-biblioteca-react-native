# 📚 Gerenciador de Biblioteca (BibliotecaApp)

Este é um projeto de aplicativo móvel desenvolvido em **React Native** com **Expo** para o gerenciamento de um acervo de biblioteca. O foco do projeto foi aprender os conceitos fundamentais de navegação entre telas, gerenciamento de estado local e persistência de dados.

## 🚀 Funcionalidades

O aplicativo permite realizar o ciclo completo de um CRUD (Create, Read, Update, Delete):

- **Listagem de Livros**: Visualização de todos os livros cadastrados em uma lista otimizada (`FlatList`).
- **Cadastro de Livros**: Formulário para inserir novos livros (Título, Autor, Ano e Disponibilidade).
- **Edição de Livros**: Alteração de dados de livros já existentes.
- **Exclusão de Livros**: Remoção de itens do acervo com atualização automática da memória.
- **Persistência Local**: Todos os dados são salvos no dispositivo através do `AsyncStorage`, garantindo que as informações não se percam ao fechar o app.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) (Stack Navigator)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) (Persistência de dados)

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Aplicativo **Expo Go** (disponível na Play Store/App Store) ou um emulador configurado.

## 🔧 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)
   cd BibliotecaApp
