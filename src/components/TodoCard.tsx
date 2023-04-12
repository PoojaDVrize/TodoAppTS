import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ITodo } from '../constants/interfaces'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface TodoCardProps {
  item: ITodo;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ item,completeTask,deleteTask }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.taskText, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
        {item.taskName}
      </Text>

      {!item.completed && (
        <TouchableOpacity onPress={() => completeTask (item.id)}>
          <View style={[styles.iconContainer, { backgroundColor: 'green' }]}>
            <MaterialIcon name='done' size={20} color='#fff' />
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <View style={styles.iconContainer}>
          <MaterialIcon name='delete' size={20} color='#fff' />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default TodoCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    elevation: 15,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  taskText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: '#1f145c'
  },
  iconContainer: {
    width: 25,
    height: 25,
    backgroundColor: 'red',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
})