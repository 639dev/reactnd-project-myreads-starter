import React,{Component} from 'react';
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types';
import ShelfBooks from './ShelfBooks'
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
		if(query != '') {
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
            	<ShelfBooks onUpdate={this.props.onUpdate} books={this.state.results} />
            </div>
          </div>

		);
	}
}





export default SearchEngine