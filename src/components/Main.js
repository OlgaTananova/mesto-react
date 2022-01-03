import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Card from './Card.js';
import {api} from '../utils/api.js';
import {useEffect, useState} from 'react';

function Main(props) {
  const [userName, setUserName] = useState('Жак-Ив-Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState('../images/avatar.jpg');
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
      });
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch(err => {
        console.log(err);
      })
  });

  const cardsList = cards.map(item => <Card key={item._id}
                                            card={item}
                                            onCardClick={props.onCardClick}/>)
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
          {cardsList}
        </ul>
      </section>
      <PopupWithForm name={'edit-profile-form'} title={'Редактировать профиль'} isOpen={props.isEditProfilePopupOpen}
                     onClose={props.onCloseAllPopups}
                     children = {
                       <fieldset className={'popup__form-fieldset'}>
                       <input type="text"
                              className="popup__form-item popup__form-item_type_profile-name"
                              name="name"
                              placeholder="Имя"
                              id="name-input"
                              minLength="2"
                              maxLength="40"
                              required/>
                       <span className="popup__input-error name-input-error">{}</span>
                       <input type="text"
                              className="popup__form-item popup__form-item_type_profile-description"
                              name="description"
                              placeholder="Род занятий"
                              id="description-input"
                              minLength="2"
                              maxLength="200"
                              required/>
                       <span className="popup__input-error description-input-error">{}</span>
                       <button type="submit"
                               className="popup__form-submit-button popup__form-submit-button_type_edit-profile-form">
                         Сохранить
                       </button>
                       </fieldset>} />
      <PopupWithForm name={'add-card-form'} title={'Новое место'} isOpen={props.isAddPlacePopupOpen}
                     onClose={props.onCloseAllPopups}
                     children={
                       <fieldset className={'popup__form-fieldset'}>
                       <input type="text"
                              className="popup__form-item popup__form-item_type_card-description"
                              name="name"
                              placeholder="Название"
                              id="card"
                              minLength="2"
                              maxLength="20"
                              required/>
                         <span className="popup__input-error card-error">{}</span>
                         <input type="url"
                                className="popup__form-item popup__form-item_type_image-link"
                                name="link"
                                placeholder="Ссылка на картинку"
                                id="link"
                                required/>
                         <span className="popup__input-error link-error">{}</span>
                         <button type="submit"
                                 className="popup__form-submit-button popup__form-submit-button_type_add-card-form">
                           Создать
                         </button>
                       </fieldset>}/>
      <PopupWithForm name={'update-avatar-form'} title={'Обновить аватар'} isOpen={props.isEditAvatarPopupOpen}
                     onClose={props.onCloseAllPopups}
                     children={
                       <fieldset className={'popup__form-fieldset'}>
                        <input type="url"
                               className="popup__form-item popup__form-item_type_avatar-link"
                               name="link"
                               placeholder="Ссылка на картинку"
                               id="avatar-link"
                               required/>
                         <span className="popup__input-error avatar-link-error">{}</span>
                         <button type="submit"
                                 className="popup__form-submit-button popup__form-submit-button_type_update-avatar-form">
                           Сохранить
                         </button>
                       </fieldset>}/>
      <PopupWithForm name={'confirm-delete-form'} title={'Вы уверены?'}
                     children={
                       <fieldset className={'popup__form-fieldset'}>
                       <button type="submit"
                               className="popup__form-submit-button popup__form-submit-button_type_confirm-delete-form">
                         Да
                       </button>
                       </fieldset>}/>
      <ImagePopup card={props.card} onClose={props.onCloseAllPopups}/>
    </main>
  )
}

export default Main