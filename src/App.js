import React from 'react'
import MyBooks from './Components/Library'
import * as BooksAPI from './BooksAPI'
import SearchResults from './Components/SearchResults'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    query: '',
    showing: []
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
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
      const books = this.state.books;
      book.shelf = event.target.value;
      this.setState({
        books
      });

      BooksAPI.update(book,book.shelf);
   }
  render() {
    const {query} = this.state
    const showingBooks = query === '' 
    ? []
    :  BooksAPI.search(query).then((books) => {
        this.setState(() => ({
         showing: books
       }))
      });
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" 
                      value={query} 
                      onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>   
            </div>
            <div className="search-books-results">
              <SearchResults onUpdate={this.updateShelf} books={this.state.showing} />
            </div>
          </div>
        ) : (
          <MyBooks onUpdate={this.updateShelf} books={this.state.books}/>
        )}
        <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BooksApp
