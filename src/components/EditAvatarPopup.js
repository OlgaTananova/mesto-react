import PopupWithForm from './PopupWithForm';
import {useEffect, useRef} from 'react';
import useInput from '../utils/formInput';

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  const isOpen = props.isOpen;
  const isLoading = props.onLoading;
  const avatar = useInput('', isOpen);
  const showAvatarError = !avatar.isCorrect && avatar.error;
  const showDisabledSubmitButton = avatar.disabledSubmitButton || isLoading;

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value)
  }

  //Очищаем инпут от введенного значения, т.к. инпут неуправляемый, это невозможно сделать
  // через логику из хука formInput
  useEffect(() => {
    !isOpen && (avatarRef.current.value = '')
  }, [isOpen])

  return (<PopupWithForm name={'update-avatar-form'}
                         title={'Обновить аватар'}
                         isOpen={props.isOpen}
                         onClose={props.onClose}
                         onSubmit={handleSubmit}
                         onLoading={props.onLoading}>
      <fieldset className={'popup__form-fieldset'}>
        <input type="url"
               className="popup__form-item popup__form-item_type_avatar-link"
               name="link"
               ref={avatarRef}
               onChange={(e) => {
                 avatar.handleError(e.target);
               }}
               placeholder="Ссылка на картинку"
               id="avatar-link"
               required/>
        <span className={`popup__input-error ${showAvatarError && 'popup__input-error_active'}
         avatar-link-error`}>{avatar.error}</span>
        <button type="submit"
                className={`popup__form-submit-button
                ${showDisabledSubmitButton && 'popup__form-submit-button_inactive'}
                popup__form-submit-button_type_update-avatar-form`}>
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </fieldset>
    </PopupWithForm>)
}

export default EditAvatarPopup