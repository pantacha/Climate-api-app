import React, { ChangeEvent, FormEvent, useState } from 'react'
import { countries } from '../../data/countries'
import styles from './Form.module.css'
import { Country, FormElements } from '../../types'
import { MessageError } from '../Messages/MessageError'

type Props = {
    getCurrentWeather: (item: FormElements) => Promise<void>;
}

const initialState = {
    city: '',
    country: ''
}

export const Form = ({getCurrentWeather}: Props) => {

  const [search, setSearch] = useState<FormElements>(initialState);
  const [message, setMessage] = useState('');

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = target;
    setSearch({
        ...search,
        [name]: value,
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(Object.values(search).includes('')){
        setMessage('All the fields are mandatory');
        return;
    }
    getCurrentWeather(search);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        {message && <MessageError>{message}</MessageError>}
        <div className={styles.field}>
            <label htmlFor="city">City:</label>
            <input
                id="city"
                type="text"
                name="city"
                placeholder="city"
                value={search.city}
                onChange={handleInputChange} />
        </div>
        <div className={styles.field}>
            <label htmlFor="country">Country:</label>
            <select id="country" value={search.country} onChange={handleInputChange} name="country">
                <option value="">-- Select a country --</option>
                    {
                        countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))
                    }
            </select>
        </div>
        <input className={styles.submit} type="submit" value={'Consult th eClimate pinche wueyyy..'} />
    </form>
  )

}
