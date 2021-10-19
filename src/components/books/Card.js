import React from 'react';
import './books.scss';

const Card = ({item, onClick}) => (
	<button className="card button-card" type="button" onClick={(event) => onClick(event, item.id)}>
        <div  className="row">
			<img src={item.imageUrl} alt={item.title} className="book-cover"/>
            <div className="column">
                <div className='height'>
                    <span className="title two-line">{item.title}</span>
                    <span className="authors two-line">{item.authors.join(",\r\n")}</span>
                </div>
                
                <div className="div-info-book">
                    <span className="info-book one-line">{`${item.pageCount} páginas`}</span>
                    <span className="info-book one-line">{`Editora ${item.publisher}`}</span>
                    <span className="info-book one-line">{`Publicado em  ${item.published}`}</span>
                </div>
            </div>
        </div>
		
	</button>
);

export default Card;
