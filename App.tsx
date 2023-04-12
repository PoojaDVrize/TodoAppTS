import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import TodoApp from './src/components/TodoApp';

const App:FC = () => {
  const n:string = '90';
  return (
    <SafeAreaView style={styles.container}>
      <TodoApp/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff'
  },
})
export default App