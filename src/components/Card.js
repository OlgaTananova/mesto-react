function Card (props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    (<li className="element" onClick={handleClick}>
      <img className="element__image"
           src={props.card.link}
           alt="Фото"/>
      <div className="element__description">
        <h2 className="element__caption">{props.card.name}</h2>
        <div className="element__like-section">
          <button type="button"
                  className="element__like-button"
                  aria-label="Кнопка лайка фотографии">{}</button>
          <span className="element__likes-qty">{props.card.likes.length}</span>
        </div>
      </div>
      <button type="button"
              className="element__trash-button"
              aria-label="Кнопка удаления фотографии">{}</button>
    </li>)
  )
}

export default Card;