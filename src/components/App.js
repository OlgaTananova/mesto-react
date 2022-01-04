import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import {useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick(){
    setAddPlacePopupState(true);
  }
  function closeAllPopups() {
    setAddPlacePopupState(false);
    setEditProfilePopupState(false);
    setEditAvatarPopupState(false);
    setSelectedCard(null)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }


  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            />
      <Footer />
      <PopupWithForm name={'edit-profile-form'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen}
                     onClose={closeAllPopups}>
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
                       </fieldset> </PopupWithForm>
      <PopupWithForm name={'add-card-form'} title={'Новое место'} isOpen={isAddPlacePopupOpen}
                     onClose={closeAllPopups}>
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
                       </fieldset></PopupWithForm>
      <PopupWithForm name={'update-avatar-form'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen}
                     onClose={closeAllPopups}>
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
                       </fieldset></PopupWithForm>
      <PopupWithForm name={'confirm-delete-form'} title={'Вы уверены?'}>
                       <fieldset className={'popup__form-fieldset'}>
                         <button type="submit"
                                 className="popup__form-submit-button popup__form-submit-button_type_confirm-delete-form">
                           Да
                         </button>
                       </fieldset>}</PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

    </div>
  )
}

export default App;
