/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, FlatList, View, Text,
  Image, ActivityIndicator, SafeAreaView,
} from 'react-native';

  const App = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // Fetch Api Data
  const getData = async () => {
    setLoading(true);
    const apiURL = `https://fakestoreapi.com/products?_limit=8&_page=${page}`;

    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setData([...data, ...resJson])
        setLoading(false);
        // function "concat" used to join two or more arrays

      });
  };

  useEffect(() => {
    getData();
  }, [])

  // Render List items using FlatList
  const renderRow = ({ index, item }) => {
    return (
      <View style={{ justifyContent: 'space-between',margin:2, width: "50%",backgroundColor:'black' }}>
        <Image source={{ uri: item.image }} style={{ height: 170, width: "100%" }} />
        <Text style={styles.itemText}  > {`${index}) ` + item.title} </Text>
      </View>
    );
  };

  renderFooter = () => {
  // ActivityIndicator Displays a circular loading indicator.
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  handleLoadMore = () => {
    setPage(page + 1);
    setLoading(true),
      getData()
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text style={{textAlign:"center",fontSize:18,justifyContent:"center"}}>Welcome TO API CALL AND PAGINATION CONCEPT</Text> */}
      <FlatList
        style={styles.container}
        data={data}
        renderItem={renderRow}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'black',
  },
 
  itemText: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    color:"white",
    margin: "5%",
    fontWeight:"bold",
    fontSize:14,
    backgroundColor: '#0000'
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});