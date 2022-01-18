import PopupWithForm from './PopupWithForm';
import {useContext, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import useInput from '../utils/formInput'

function EditProfilePopup (props) {
  const currentUser = useContext(CurrentUserContext);
  const isLoading = props.onLoading;
  const isOpen = props.isOpen;
  const name = useInput(currentUser.name, isOpen);
  const description = useInput(currentUser.about, isOpen);
  const showDescriptionError = !description.isCorrect && description.error;
  const showNameError = !name.isCorrect && name.error;
  const showDisabledSubmitButton = name.disabledSubmitButton || description.disabledSubmitButton || isLoading;


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name.value, description.value)
  }


  useEffect(()=>{
    name.handleChange(currentUser.name);
    description.handleChange(currentUser.about)
  }, [currentUser])


  return (
    <PopupWithForm name={'edit-profile-form'} title={'Редактировать профиль'} isOpen={props.isOpen}
                   onClose={props.onClose} onSubmit={handleSubmit} onLoading={props.onLoading}>
      <fieldset className={'popup__form-fieldset'} form={'edit-profile-form'}>
        <input type="text"
               className="popup__form-item popup__form-item_type_profile-name"
               name="profileName"
               value={name.value}
               onChange={name.handleChange}
               placeholder="Имя"
               id="nameInput"
               minLength="2"
               maxLength="40"
               required/>
        <span className={`popup__input-error name-input-error 
        ${showNameError&& 'popup__input-error_active'}`}>{name.error}</span>
        <input type="text"
               className="popup__form-item popup__form-item_type_profile-description"
               name="description"
               value={description.value}
               onChange={description.handleChange}
               placeholder="Род занятий"
               id="description-input"
               minLength="2"
               maxLength="200"
               required/>
        <span className={`popup__input-error description-input-error
        ${showDescriptionError&& 'popup__input-error_active'}`}>{description.error}</span>
        <button type="submit"
                className={`popup__form-submit-button 
                ${(showDisabledSubmitButton)&& 'popup__form-submit-button_inactive'}
                popup__form-submit-button_type_edit-profile-form`}
                >
          {isLoading? "Сохранение...": "Сохранить"}
        </button>
      </fieldset> </PopupWithForm>
  )
}

export default EditProfilePopup