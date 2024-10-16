import styles from './App.module.css';
import { Form } from './components/Form/Form';
import { useWeather } from './hooks/useWeather';
import { PlaceWeatherDetails } from './components/PlaceWeatherDetails/PlaceWeatherDetails';
import { Spinner } from './components/LoadingComponent/Spinner';
import { MessageError } from './components/Messages/MessageError';

export const MainPage = () => {

  const {getCurrentWeather, weather, hasInitialPlace, loading, notFound} = useWeather();

  return (
    <>
        <h1 className={styles.title}>Climate Search</h1>
        <div className={styles.container}>
            <Form getCurrentWeather={getCurrentWeather} />
            { loading && <Spinner /> }
            { hasInitialPlace && <PlaceWeatherDetails weather={weather} /> }
            {( notFound && !hasInitialPlace) && <MessageError>Lost City</MessageError> }
        </div>
    </>
  )

}
