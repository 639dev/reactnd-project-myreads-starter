import React from 'react'
import Library from './Components/Library'
import * as BooksAPI from './BooksAPI'
import SearchEngine from './Components/SearchEngine'
import {Route,Link} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
         books
      }))
    })
   }
  updateShelf = (event,book) => {
    let shelf = event.target.value;
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      this.componentDidMount();
    })
   }
  render() {  
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <Library onUpdate={(event,book) => {this.updateShelf(event,book)}} books={this.state.books}/>
            <div className="open-search">
            <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />

        <Route exact path="/search" render={() => (
            <SearchEngine onUpdate={(event,book) => {this.updateShelf(event,book)}} books={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp
