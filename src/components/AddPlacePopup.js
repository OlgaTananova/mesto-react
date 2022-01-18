import PopupWithForm from './PopupWithForm.js';
import useInput from '../utils/formInput.js'

function AddPlacePopup(props) {
  const isLoading = props.onLoading;
  const isOpen = props.isOpen;
  const cardName = useInput('', isOpen);
  const cardLink = useInput('', isOpen);
  const showCardNameError = !cardName.isCorrect && cardName.error;
  const showCardLinkError = !cardLink.isCorrect && cardLink.error;
  const showDisabledSubmitButton = cardName.disabledSubmitButton || cardLink.disabledSubmitButton
  || isLoading;


  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(cardName.value, cardLink.value)
  }

  return (
    <PopupWithForm name={'add-card-form'} title={'Новое место'} isOpen={props.isOpen}
                   onClose={props.onClose} onSubmit={handleSubmit}
                  onLoading={props.onLoading}>
      <fieldset className={'popup__form-fieldset'}>
        <input type="text"
               className="popup__form-item popup__form-item_type_card-description"
               name="name"
               value={cardName.value}
               onChange={cardName.handleChange}
               placeholder="Название"
               id="card"
               minLength="2"
               maxLength="20"
               required/>
        <span className={`popup__input-error card-error
        ${showCardNameError&& 'popup__input-error_active'}`}>{cardName.error}</span>
        <input type="url"
               className="popup__form-item popup__form-item_type_image-link"
               name="link"
               value={cardLink.value}
               onChange={cardLink.handleChange}
               placeholder="Ссылка на картинку"
               id="link"
               required/>
        <span className={`popup__input-error link-error 
                        ${showCardLinkError&& 'popup__input-error_active'}`}>{cardLink.error}</span>
        <button type="submit"
                className={`popup__form-submit-button 
                ${showDisabledSubmitButton&& 'popup__form-submit-button_inactive'} popup__form-submit-button_type_add-card-form`}>
          {isLoading? 'Сохранение...' : 'Создать'}
        </button>
      </fieldset></PopupWithForm>
  )
}

export default AddPlacePopup