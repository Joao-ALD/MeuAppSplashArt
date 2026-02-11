import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  // .trim() é um método que remove os espaços em branco do início e do fim da string, garantindo que o usuário não possa adicionar tarefas vazias ou com apenas espaços.
  function adicionarTarefa() {
    if (tarefa.trim() === '') return;
    const novaTarefa = {
      id: Date.now().toString(),
      texto: tarefa,
      concluida: false,
    };



    setTarefas([...tarefas, novaTarefa]);
    // ... é o operador de espalhamento, que cria um novo array com os itens existentes e adiciona a nova tarefa no final
    setTarefa('');
  }

  // toggleTarefa - esta função é responsável por alternar o estado de conclusão de uma tarefa. Ela recebe o id da tarefa como parâmetro e atualiza o array de tarefas, invertendo o valor da propriedade concluida para a tarefa correspondente. O método map é usado para criar um novo array de tarefas, onde cada item é verificado: se o id do item corresponde ao id fornecido, a propriedade concluida é invertida; caso contrário, o item permanece inalterado.
  // *O map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
  function toggleTarefa(id) {
    setTarefas(tarefas.map(item =>
      item.id === id ? { ...item, concluida: !item.concluida } : item
    ));
  }

  //? function deletarTarefa - esta função é responsável por remover uma tarefa do array de tarefas. Ela recebe o id da tarefa como parâmetro e atualiza o array de tarefas, filtrando-o para excluir a tarefa com o id correspondente. O método filter é usado para criar um novo array que inclui apenas os itens cujo id não corresponde ao id fornecido.
  // *The filter() method creates a new array with all elements that pass the test implemented by the provided function.  
  function deletarTarefa(id) {
    setTarefas(tarefas.filter(item => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa"
          placeholderTextColor="#B0B0B0"
          value={tarefa}
          onChangeText={setTarefa}
        />
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tarefaItem} onPress={() => toggleTarefa(item.id)}>
            <Text style={[styles.tarefaTexto, item.concluida && styles.tarefaConcluida]}>
              {item.texto}
            </Text>

            <TouchableOpacity
              style={styles.botaoDeletar}
              onPress={() => deletarTarefa(item.id)}>
              <Text style={styles.textoDeletar}>X</Text>
            </TouchableOpacity>

          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingTop: 80,
    paddingHorizontal: 20
  },
  titulo: {
    color: '#007BFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 30,
    fontSize: 16,
    paddingLeft: 25,
    marginRight: 10,
    color: "#333",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

  },
  botaoAdicionar: {
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  tarefaItem: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tarefaTexto: {
    color: "#333",
    fontSize: 18,
    flex: 1,
  },
  tarefaConcluida: {
    textDecorationLine: 'line-through',
    color: "#999"
  },
  botaoDeletar: {
    marginLeft: 15,
    padding: 5,
  },
  textoDeletar: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 20
  },
});