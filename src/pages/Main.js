import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Main = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("books").then((data) => {
      const book = JSON.parse(data);
      setBooks(book);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.toolBox}>
        <Text style={styles.title}>Lista de Livros</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Book");
          }}
          style={styles.toolBoxButton}
        >
          <Icon name="add" size={18} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={styles.itemButton}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Icon name="create" size={18} color="#2ecc71" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  toolBox: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 20,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: "#3498db",
  },
  toolBoxButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 54,
    backgroundColor: "#3498db",
    width: 32,
    height: 32,
  },
  itemText: {
    fontSize: 18,
  },
  itemButton: {},
  editButton: {},
});
export default Main;
