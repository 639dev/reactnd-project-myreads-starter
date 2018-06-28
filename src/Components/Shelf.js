import React from 'react';
import PropTypes from 'prop-types'

function Shelf(props){
		return (
	        <div className="bookshelf">
              <h2 className="bookshelf-title">{props.shelfName}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {props.books && (
                    props.books.map((book) => (
                  <li key={book.title}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                           <select 
                            name="shelf" 
                            onChange={(event) => props.onUpdate(event, book)}
                            value={book.shelf}
                            >
                              <option value="none" disabled>Move to...</option>
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

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default Shelf;