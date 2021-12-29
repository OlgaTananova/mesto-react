import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import {useState} from 'react';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState('')

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
    setSelectedCard('')
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }


  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick} isEditAvatarPopupOpen={isEditAvatarPopupOpen }
      isEditProfilePopupOpen={isEditProfilePopupOpen} isAddPlacePopupOpen={isAddPlacePopupOpen}
      onCloseAllPopups={closeAllPopups} onCardClick={handleCardClick} card={selectedCard}/>
      <Footer />
    </div>
  )
}

export default App;
