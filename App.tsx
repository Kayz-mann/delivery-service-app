import { StatusBar } from 'expo-status-bar';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigator';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Constants from 'expo-constants';


const client = new ApolloClient({
  uri: 'https://acatzingo.stepzen.net/api/knotted-spaniel/__graphql',
  headers: {'Authorization':`apikey acatzingo::stepzen.io+1000::e5a4aac8984ff2b1f5ac23c5985075633ac05ef72476ba8b63d3746e59dc3739`},
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

