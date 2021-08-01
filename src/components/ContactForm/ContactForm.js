import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

function ContactForm({ handelAddContact, isExistContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputForm = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        toast.error(`There are no type input "${name}"`);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    // const validateForm = () => {
    //   if (!name || !number) {
    //     alert('Some filed is empty');
    //     return;
    //   }
    const validateForm = name.trim();
    if (isExistContact(name)) {
      return toast.error(`${validateForm} Contact already exists`);
    }
    //   console.log(validateForm);

    if (!validateForm) {
      return toast.error('Please enter contact name');
    }
    handelAddContact({ name: validateForm, number, id: uuidv4() });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <label>
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          placeholder="Enter name"
          value={name}
          onChange={handleInputForm}
        />
      </label>
      <label>
        <input
          className={s.input}
          type="tell"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          placeholder="Enter phone number"
          value={number}
          onChange={handleInputForm}
        />
      </label>

      <button className={s.button} type="submit">
        {' '}
        Add Contact{' '}
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  isExistContact: PropTypes.func.isRequired,
  handelAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
