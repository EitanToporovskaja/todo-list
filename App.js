import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import styles from './styles.js';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const agregarTodo = () => {
    const todoInput = inputText.trim();
    if (todoInput !== "") {
      const timestamp = new Date().toLocaleString();
      setTodos([...todos, { tarea: todoInput, timestamp, completado: false }]);
      setInputText('');
    } else {
      Alert.alert("No has agregado ninguna tarea");
    }
  };

  const toggleTodoCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completado = !newTodos[index].completado;
    if (newTodos[index].completado) {
      newTodos[index].completadoTimestamp = new Date().toLocaleString();
    } else {
      delete newTodos[index].completadoTimestamp;
    }
    setTodos(newTodos);
  };

  const borrarTodos = () => {
    if (todos.length === 0) {
      Alert.alert("No hay tareas para borrar");
    } else {
      setTodos([]);
    }
  };

  const borrarTodo = (index) => {
    if (todos.length === 0) {
      Alert.alert("No hay tareas para borrar");
    } else {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };
  const mostrarTareaMasRapida = () => {
    if (todos.length === 0) {
      Alert.alert("Aún no se han agregado tareas!");
      return;
    }
    const tareaRapida = todos.reduce((prev, curr) => {
      return (new Date(curr.timestamp) - new Date(prev.timestamp) < 0) ? curr : prev;
    });
    Alert.alert(`La tarea más rápida fue: ${tareaRapida.tarea}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Agregar nuevo todo"
        value={inputText}
        onChangeText={setInputText}
      />
      <TouchableOpacity style={styles.button} onPress={agregarTodo}>
        <Text style={styles.buttonText}>Agregar Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={mostrarTareaMasRapida}>
        <Text style={styles.buttonText}>Mostrar la tarea más rápida</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todoItemContainer}>
            <TouchableOpacity onPress={() => toggleTodoCompletion(index)}>
              <Text style={[styles.todoItem, item.completado && styles.completed]}>
                {item.tarea} - {item.timestamp}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => borrarTodo(index)}>
              <Text style={styles.closeButton}>&times;</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.todoList}
      />
      <TouchableOpacity style={styles.button} onPress={borrarTodos}>
        <Text style={styles.buttonText}>Borrar los Todos</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}