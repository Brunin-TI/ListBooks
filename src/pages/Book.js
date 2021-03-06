import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import Camera from "../components/Camera";
import Photo from "../components/Photo";
const Book = ({ navigation }) => {
  const book = navigation.getParam("book", {
    title: "",
    description: "",
    read: false,
    photo: "",
  });

  const isEdit = navigation.getParam("isEdit", false);

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [read, setRead] = useState(book.read);
  const [photo, setPhoto] = useState(book.photo);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    if (isValid()) {
      if (isEdit) {
        // altera o livro corrente
        let newBooks = books;

        newBooks.map((item) => {
          if (item.id === book.id) {
            item.title = title;
            item.description = description;
            item.read = read;
            item.photo = photo;
          }
          return item;
        });

        await AsyncStorage.setItem("books", JSON.stringify(newBooks));
      } else {
        // adiciona um novo livro
        const id = Math.random(5000).toString();
        const data = {
          id,
          title,
          description,
          photo,
        };

        books.push(data);

        await AsyncStorage.setItem("books", JSON.stringify(books));
      }

      navigation.goBack();
    } else {
      console.log("Inválido!");
    }
  };
  const onCloseModal = () => setIsModalVisible(false);
  const onChangePhoto = (newPhoto) => setPhoto(newPhoto);

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
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Icon name="camera" size={28} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, isValid() ? "" : styles.saveButtonInvalid]}
        onPress={onSave}
      >
        <Text style={styles.saveButtonText}>
          {isEdit ? "Atualizar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={isModalVisible}>
        {photo ? (
          <Photo
            photo={photo}
            onDeletePhoto={onChangePhoto}
            onClosePicture={onCloseModal}
          />
        ) : (
          <Camera onCloseCamera={onCloseModal} onTakePicture={onChangePhoto} />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight,
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
