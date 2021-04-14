import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const Book = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    AsyncStorage.getItem("books").then((data) => {
      const book = JSON.parse(data);
      setBooks(book);
    });
  }, []);

  const isValid = () => {
    if (title !== undefined && title !== "") {
      return true;
    }
    return false;
  };
  const onSave = async () => {
    console.log(`Title ${title}`);
    console.log(`Description ${description}`);

    if (isValid()) {
      console.log("Válido!");

      const id = Math.random(5000).toString();
      const data = {
        id,
        title,
        description,
        photo,
      };
      books.push(data);
      console.log(JSON.stringify(data));
      await AsyncStorage.setItem("books", JSON.stringify(books));
      navigation.goBack();
    } else {
      console.log("Inválido!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Inclua seu livro...</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <TouchableOpacity style={styles.cameraButton}>
        <Icon name="camera" size={28} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, !isValid() ? styles.saveButtonInvalid : ""]}
        onPress={onSave}
      >
        <Text style={styles.saveButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    borderBottomColor: "#f39c12",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  cameraButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 54,
    backgroundColor: "#f39c12",
    width: 50,
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#f39c12",
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  saveButtonInvalid: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  cancelButton: {
    alignSelf: "center",
  },
  cancelButtonText: {
    color: "#95a5a6",
  },
});
export default Book;
