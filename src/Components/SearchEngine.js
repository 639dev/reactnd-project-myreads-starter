import React,{Component} from 'react';
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


class SearchEngine extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onUpdate: PropTypes.func.isRequired
	}

	state = {
		query: '',
		results: []
	}

	updateQuery = (query) => {
		this.setState({query: query.trim()});
		this.search(query);
	}

	search = (query) => {
		if(query) {
	        BooksAPI.search(query).then(result => {
	          this.checkAdded(result)
	          this.setState({results: result})
	     })
	    }
	}
	checkAdded = (result) => {
		let addedBooks = this.props.books;
		result.filter(book => (book.shelf !== 'currentlyReading' || book.shelf !== 'read' || book.shelf !== 'wantToRead'))
			  .map((book) => book.shelf = 'none');

		result.forEach((book) => {
			for(let i = 0 ; i< addedBooks.length ; i++ ){
				if(addedBooks[i].id === book.id)
				{
					book.shelf = addedBooks[i].shelf; 
				}
			}
		})
	}

	render() {
		const {query} = this.state
		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" 
                       value={query} 
                       onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>   
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
		        {this.state.results.length > 0 && (
			        this.state.results.map((book) => (
			          <li key={book.id}>
			            <div className="book">
			              <div className="book-top">
			                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
			                <div className="book-shelf-changer">
			                  <select
			                  name="shelf" 
			                  onChange={(event) => this.props.onUpdate(event, book)}
			                  value={book.shelf}
			                  >
			                    <option value="move" disabled>Move to...</option>
			                    <option value="currentlyReading">Currently Reading</option>
			                    <option value="wantToRead">Want to Read</option>
			                    <option value="read">Read</option>
			                    <option value="none">None</option>
			                  </select>
			                </div>
			              </div>
			              <div className="book-title">{book.title}</div>
			              <div className="book-authors">{book.authors}</div>
			            </div>
			          </li>
			        ))
		        )}
		      </ol>
            </div>
          </div>

		);
	}
}





export default SearchEngine