import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const EmojiPickerComponent = ({ chosenEmoji, setChosenEmoji }) => {
  const [toggleEmoji, setToggleEmoji] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const toggleEmojiPicker = () => {
    setToggleEmoji(!toggleEmoji);
  };

  return (
    <div>
      {/* <button onClick={toggleEmojiPicker}>React</button> */}
      {toggleEmoji && (
        <>
          {chosenEmoji ? (
            <span>You chose: {chosenEmoji.emoji}</span>
          ) : (
            <span>No emoji Chosen</span>
          )}
          <Picker onEmojiClick={onEmojiClick} />
        </>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
