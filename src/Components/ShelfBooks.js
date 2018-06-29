import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


function ShelfBooks(props) {
	return (
		<ol className="books-grid">
        {props.books && (
            props.books.map((book) => (
              <li key={book.id}>
                <Book book={book} onUpdate={props.onUpdate}/>
              </li>
           ))
        )}
    </ol>
	);
}

ShelfBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default ShelfBooks