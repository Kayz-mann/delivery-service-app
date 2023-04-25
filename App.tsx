import { StatusBar } from 'expo-status-bar';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigator';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Constants from 'expo-constants';


const client = new ApolloClient({
  uri: 'baseURL',
  headers: {'Authorization':`APIKEY`},
  cache: new InMemoryCache(),
});




export default function App() {
  return (
    //@ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

