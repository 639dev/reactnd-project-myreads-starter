import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Shelf from './Shelf';

class Library extends Component {
	render() {
		return(
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
	              <div>
	                <Shelf onUpdate={this.props.onUpdate} shelfName="Currently Reading" books={this.props.books.filter((book) => (book.shelf === 'currentlyReading'))}/>
	                <Shelf onUpdate={this.props.onUpdate} shelfName="Want to Read" books={this.props.books.filter((book) => (book.shelf === 'wantToRead'))}/>
	                <Shelf onUpdate={this.props.onUpdate} shelfName="Read" books={this.props.books.filter((book) => (book.shelf === 'read'))}/>
	              </div>
	            </div>
	        </div>
		)
	}
}



export default Library;