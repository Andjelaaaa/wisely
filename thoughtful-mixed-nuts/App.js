//import * as React from 'react';
import { View, Text } from 'react-native';
import {Input, Button} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert, } from 'react-native';
  TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
// You can import from local files
import AssetExample from './components/AssetExample';

const Separator = () => <View style={styles.separator} />;



 const RandomAnimal = () => {
  const [catImage, setCatImage] = useState(null);
  const [page, setPage] = useState(Math.floor(Math.random() * 1000));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.pexels.com/v1/search?query=cute+animal&per_page=1&page='+page,
        {
          headers: {
            Authorization: 'hfpvEFVY5njYqODO55DEx8tICOKORwIrX5NyjNgBYa8A7wtU9SuSho6U',
          },
        }
      );
      const data = await response.json();
      setCatImage(data.photos[0].src.medium);
    };
    fetchData();
  }, [page]);

  const generateRandomPage = () => {
    setPage(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {catImage ? (
        <Image
          source={{ uri: catImage }}
          style={{ width: 300, height: 300}}
        />
      ) : null}
      <TouchableOpacity onPress={generateRandomPage}>
      </TouchableOpacity>
    </View>
  );
};

const RandomQuote = () => {
  const [currentQuote, setCurrentQuote] = useState({ quote: "", author: "" });

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const quoteData = await response.json();

      setCurrentQuote({ quote: quoteData.content, author: quoteData.author });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', color:'#FFFFFF'}}>
      <Text style={styles.innerTextQuote}>{currentQuote.quote}</Text>
      <Text style={styles.innerTextAuthor}>{currentQuote.author ?`- ${currentQuote.author}` : "- Anonymous"}</Text>
      <TouchableOpacity onPress={fetchRandomQuote} style={{margin: 20}}>
      </TouchableOpacity>
    </View>
  );
};



const RandomGif = () => {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    const fetchGif = async () => {
      const response = await fetch(
        'https://api.giphy.com/v1/gifs/random?api_key=1QZUkDRh7YjJPHyompNPRnUAYmJ3aLvR&tag=&rating=G'
      );
      const data = await response.json();
      setGif(data.data.images.original.url);
    };

    fetchGif();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {gif ? (
        <Image
          source={{ uri: gif }}
          style={{ width: 300, height: 300 }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const REDDIT_API = 'https://www.reddit.com/r/memes/random.json';

const RandomRedditMeme = () => {
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    const fetchMeme = async () => {
      const response = await fetch(REDDIT_API);
      const data = await response.json();
      const memePost = data[0].data.children[0].data;
      setMeme(memePost.url);
    };

    fetchMeme();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {meme ? (
        <Image
          source={{ uri: meme }}
          style={{ width: 300, height: 300, resizeMode: 'contain' }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
      
      <AssetExample />
 
      <Separator />

      <Button
       
        onPress={() => navigation.navigate('Quote!')}
        
   titleStyle={{
       color: "white",
       fontSize: 35,
       alignItems: 'center',
   }}
   buttonStyle={{
       backgroundColor: "#E0ADF8",
       
   }}

    title="Quote!"
      />
      <Separator />
      <Button
        title="Meme please!"
        onPress={() => navigation.navigate('Meme please!')}
        titleStyle={{
       color: "#FFFFFF",
       fontSize: 35,
       alignItems: 'center',
   }}
   buttonStyle={{
       backgroundColor: "#E0ADF8",
       
   }}
      />
      <Separator />
      <Button
        title="Cute animal!"
        onPress={() => navigation.navigate('Cute Animal!')}
        titleStyle={{
       color: "#FFFFFF",
       fontSize: 35,
       alignItems: 'center',
   }}
   buttonStyle={{
       backgroundColor: "#E0ADF8",
      }}
      />
      <Separator />
      <Button
        title="Gif!"
        onPress={() => navigation.navigate('Gif!')}
        titleStyle={{
       color: "#FFFFFF",
       fontSize: 35,
       alignItems: 'center',
   }}
   buttonStyle={{
       backgroundColor: "#E0ADF8",
      }}
      />
      <Separator />
    </View>
    </SafeAreaView>
    
  );
}

function QuoteScreen({ navigation }) {
  return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <RandomQuote />
      </View>
  );
}

function MemeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   <RandomRedditMeme />
    </View>
  );
}

function AnimalsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <RandomAnimal />
      
      
    </View>
    
  );
}

function GifScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RandomGif/>
      </View>


  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="" component={HomeScreen} />
        <Stack.Screen name="Quote!" component={QuoteScreen} />
        <Stack.Screen name="Meme please!" component={MemeScreen} />
        <Stack.Screen name="Cute Animal!" component={AnimalsScreen} />
        <Stack.Screen name="Gif!" component={GifScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    backgroundColor: '#504180',
  },
  
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  innerTextQuote: {
    color: 'white',
    fontSize: 30, 
    margin: 20,

  },
  innerTextAuthor: {
    color: 'white',
    fontSize: 15, 
    margin: 20,

  },
});

export default App;