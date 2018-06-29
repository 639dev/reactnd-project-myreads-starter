import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


function ShelfBooks(props) {
	return (
		<ol className="books-grid">
        {props.books.length > 0 ? (
            props.books.map((book) => (
              <li key={book.id}>
                <Book book={book} onUpdate={props.onUpdate}/>
              </li>
           ))
        ) : <p className="warn-txt">Books not found</p>}
    </ol>
	);
}

ShelfBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default ShelfBooks