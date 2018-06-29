import React from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

function Library(props){
    const shelves = [
        ['Currently Reading', 'currentlyReading'],
        ['Want to Read', 'wantToRead'],
        ['Read', 'read']
    ]
	return(
		<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            
            {props.books && (
            	shelves.map((shelf) => (
                <Shelf key={shelf[0]} onUpdate={props.onUpdate} shelfName={shelf[0]} books={props.books.filter((book) => (book.shelf === shelf[1]))}/>
            ))
            )}
            </div>
        </div>
	)
}

Library.propTypes = {
	books: PropTypes.array.isRequired,
	onUpdate: PropTypes.func.isRequired
}



export default Library