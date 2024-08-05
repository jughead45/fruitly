/**
 * "StAuth10244: I Jhayvee Arai, 000899156 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 */
import React, { useState } from 'react';
import { Button, Text, TextInput, View, FlatList, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

function App() {
  const [fruitName, setFruitName] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const image = require("./assets/fruit-wallpaper.jpg");

  async function getFruit() {
    try {
      setLoading(true)
      const response = await axios.get(`https://www.fruityvice.com/api/fruit/${fruitName}`);
      setData([response.data]);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch fruit data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function getAllFruits() {
    try {
      setLoading(true)
      const response = await axios.get('https://www.fruityvice.com/api/fruit/all');
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch fruit data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function showNutritions(item) {
    setSelectedFruit(item);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.imageBackground}>
      <Text style={styles.title}>Fruitly</Text>
        <Text style={styles.description}>Welcome Fruit enthusiast! Click the fruit to see nutritional information.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter fruit name"
          value={fruitName}
          onChangeText={term => setFruitName(term)}
          onSubmitEditing={getFruit}
        />
        <View style={styles.buttonContainer}>
          <Button title="Get Fruit Data" onPress={getFruit} />
          <Button title="Get All Fruits" onPress={getAllFruits} />
        </View>
        {isLoading ? (
          <ActivityIndicator style={styles.loader} size="large" color="#5CDB95" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.fruitContainer} onPress={() => showNutritions(item)}>
                <View style={styles.fruit}>
                  <Text style={styles.fruitName}>{item.name}</Text>
                </View>
                <Text style={styles.infoText}>{`Genus: ${item.genus}`}</Text>
                <Text style={styles.infoText}>{`Family: ${item.family}`}</Text>
                <Text style={styles.infoText}>{`Order: ${item.order}`}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.infoText}>No fruits found</Text>}
          />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {selectedFruit && (
                <>
                  <Text style={styles.modalTitle}>Nutrition Facts</Text>
                  <Text style={styles.fruit}>{selectedFruit.name}</Text>
                  <Text style={styles.modalText}>Calories: {selectedFruit.nutritions.calories}</Text>
                  <Text style={styles.modalText}>Carbs: {selectedFruit.nutritions.carbohydrates}</Text>
                  <Text style={styles.modalText}>Fat: {selectedFruit.nutritions.fat}</Text>
                  <Text style={styles.modalText}>Protein: {selectedFruit.nutritions.protein}</Text>
                  <Text style={styles.modalText}>Sugar: {selectedFruit.nutritions.sugar}</Text>
                </>
              )}
              <Button
                onPress={() => setModalVisible(false)}
                title="Close"
              />
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: '#05386B',
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#05386B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#5CDB95',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#F5F5F5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: '#FF0000',
    marginTop: 20,
  },
  fruitContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  fruit: {
    alignItems: 'center',
    backgroundColor: 'aliceblue',
    padding: 10,
  },
  fruitName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5CDB95',
  },
  infoText: {
    color: '#05386B',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#05386B',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#05386B',
  }
});

export default App;
