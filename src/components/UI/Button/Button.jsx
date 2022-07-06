import buttonStyles from './Button.module.scss';

// типизировать после установки typescript

const Rn3dtButton = ({ isDisabled, text, onClick, type }) => (
  <button
    className={buttonStyles.button}
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={isDisabled}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Rn3dtButton;
