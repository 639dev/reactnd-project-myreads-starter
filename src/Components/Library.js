import React from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';

function Library(props){
		return(
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
	            {props.books && (
	            	<div>
	                	<Shelf onUpdate={props.onUpdate} shelfName="Currently Reading" books={props.books.filter((book) => (book.shelf === 'currentlyReading'))}/>
	                	<Shelf onUpdate={props.onUpdate} shelfName="Want to Read" books={props.books.filter((book) => (book.shelf === 'wantToRead'))}/>
	                	<Shelf onUpdate={props.onUpdate} shelfName="Read" books={props.books.filter((book) => (book.shelf === 'read'))}/>
	              </div>
	            )}
	            </div>
	        </div>
		)
}

Library.propTypes = {
	books: PropTypes.array.isRequired,
	onUpdate: PropTypes.func.isRequired
}



export default Library;