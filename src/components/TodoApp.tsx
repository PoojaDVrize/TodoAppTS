import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import TodoCard from './TodoCard';
import { ITodo } from '../constants/interfaces';


// https://medium.com/@amanshharma/react-native-todo-app-using-typescript-and-hooks-bacc5db05100
// https://github.com/machadop1407/TodoList-React-TypeScript/blob/main/src/App.tsx
// https://chat.openai.com/chat/a4872980-3f73-48a5-8d96-4b117fbe3a39
// https://github.com/hakymz/TodoAppReactNative/blob/main/App.js

const TodoApp: FC = () => {

    const [task, setTask] = useState<string>('');
    const [todoList, setTodoList] = useState<ITodo[]>([]);

    const addTodo = (): void => {
        Keyboard.dismiss();
        if (!task.trim()) {
            Alert.alert('Error', 'Please input todo');
            return;
        }
        const newTodo: ITodo = {
            id: new Date().getTime().toString(),
            taskName: task.trim(),
            completed: false
        }
        setTodoList([...todoList, newTodo]);
        setTask('');

    }

    const completeTask = (id: string): void => {
        const newTodos = todoList.map(item => {
            if (item.id == id) {
                return { ...item, completed: true }
            }
            return item;
        });
        setTodoList(newTodos);
    }

    const deleteTask = (id: string): void => {
        const newTodos = todoList.filter(item => item.id !== id);
        setTodoList(newTodos);
    }

    const clearAllTodos = () => {
        Alert.alert('Confirm','Clear all todos?',[
            {
                text: 'Yes',
                onPress: () => setTodoList([])
            },
            {
                text: 'No'
            }
        ]);
    }

    return (
        <SafeAreaView >
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Todo App</Text>
                <TouchableOpacity onPress={clearAllTodos}>
                    <View style={[styles.iconContainer,{backgroundColor: 'red'}]}>
                        <MaterialIcon name='delete' size={30} color='#fff' />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter task...'
                    value={task}
                    onChangeText={(val) => setTask(val)}
                />
                <TouchableOpacity onPress={addTodo}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon name='add' size={30} color='#fff' />
                    </View>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={todoList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <TodoCard
                        item={item}
                        completeTask={completeTask}
                        deleteTask={deleteTask} />}
            />
        </SafeAreaView>
    )
}

export default TodoApp

const styles = StyleSheet.create({
    headingContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 5
    },
    heading: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#000',
       // marginBottom: 10
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 10,
        width: '80%',
        height: 50,
        fontSize: 20,
    },
    iconContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        marginRight: 5
    }
})