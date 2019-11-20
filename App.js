import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  List,
  ListItem,
  Content,
} from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      results: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch() {
    const term = this.state.term;
    if (term !== '') {
      const termsArray = term.split(' ');
      const query = termsArray.join('&');
      console.log(query);
      fetch('https://itunes.apple.com/search?term=' + query + '&limit=20')
        .then(response => response.json())
        .then(responseJSON => {
          console.log(responseJSON);
          this.setState({
            results: responseJSON.results,
          });
        });
    }
  }

  handleChange = event => {
    console.log(event.nativeEvent.text);
    const text = event.nativeEvent.text;
    this.setState({
      term: text,
    });
  };

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChange={event => this.handleChange(event)}
            />
          </Item>
          <TouchableOpacity
            style={{width: 100, paddingLeft: 15, paddingTop: 15}}
            onPress={this.handleSearch}>
            <Text style={{color: '#fff'}}>Search</Text>
          </TouchableOpacity>
        </Header>
        <Content>
          <List>
            {this.state.results.map((item, index) => {
              return (
                <ListItem key={index}>
                  <Text>{item.collectionName}</Text>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}
