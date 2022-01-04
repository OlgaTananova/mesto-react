import Card from './Card.js';
import {api} from '../utils/api.js';
import {useEffect, useState} from 'react';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err => {
        console.log(err);
      })
  }, [userName, userDescription, userAvatar]);

  useEffect(()=>{
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [cards]);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img className="profile__avatar"
               src={userAvatar}
               alt="Фото-аватар"/></div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__description">{userDescription}</p>
          <button type="button"
                  className="profile__edit-button"
                  aria-label="Кнопка редактирования профиля"
                  onClick={props.onEditProfile}>{}</button>
        </div>
        <button type="button"
                className="profile__add-button"
                aria-label="Кнопка добавления фотографий"
                onClick={props.onAddPlace}>{}</button>
      </section>
      <section className="elements-section content__elements-section"
               aria-label="Фоторамка">
        <ul className="elements">
          {cards.map(item => <Card key={item._id}
                                   card={item}
                                   onCardClick={props.onCardClick}/>)}
        </ul>
      </section>
    </main>
  )
}

export default Main