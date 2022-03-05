import { useHistory } from 'react-router-dom';

export default function Details() {

    const history = useHistory();

    const handleBack = () => {
        history.push('/');
    }

    return (
        <>
            <div>

                <button onClick={handleBack}>Back</button>
            </div>
        </>
    )
}