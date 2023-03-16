import React, {useState, useEffect} from 'react';
import Task from './components/Task';
import { StyleSheet, Text,ScrollView, Alert, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () =>{
    if(task)
    {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  }

  const taskCompleted = (index) =>{
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy);
      Alert.alert("your task has been removed!","")
  }

  const completeTask = (index) => {
    Alert.alert("", "you want to remove thi task?", [{text:"yes", onPress: () => taskCompleted(index),}, {text: "no",}])
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}></View>
      <Text style={styles.sectionTitle}>Today's tasks</Text>
      <ScrollView style={styles.items}>
        {
          taskItems.map((item, index) =>{
            return (
           <TouchableOpacity  key={index} onPress={() => completeTask(index)}>
             <Task name={item}/>
           </TouchableOpacity> 
            )
          })
        }
      </ScrollView>
      {/* write a task */}
      <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}>
        <View>
          <TextInput style={styles.input} value={task} placeholder="write a task" onChangeText={text => setTask(text)}/>
        </View>
        <TouchableOpacity onPress={()=> handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  taskWrapper:{},
  sectionTitle:{
    fontSize: 24,
    fontWeight: "bold"
  },
  items:{
    marginTop:30,
  },
  writeTaskWrapper:{
    bottom:60,
    width: "100%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",

  },
  input:{
    width:250,
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:"#fff",
    borderRadius:60,
    borderColor:"#c0c0c0",
    borderWidth:1
  },
  addWrapper:{
    height:60,
    width:60,
    backgroundColor:"#fff",
    borderRadius:"50%",
    justifyContent:"center",
    alignItems:"center",
    borderColor:"#c0c0c0",
    borderWidth:1,

  },
  addText:{},
});
