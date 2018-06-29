import React from 'react'
import ShelfBooks from './ShelfBooks'
import PropTypes from 'prop-types'

function Shelf(props){
	return (
      <div className="bookshelf">
          <h2 className="bookshelf-title">{props.shelfName}</h2>
          <div className="bookshelf-books">
            <ShelfBooks onUpdate={props.onUpdate} books={props.books} />
          </div>
      </div>
	);
}

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default Shelf