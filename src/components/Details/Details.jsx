

export default function Details() {

    const handleBack = () => {
        console.log('Go Back Clicked!');
    }

    return (
        <>
            <div>

                <button onClick={handleBack}>Back</button>
            </div>
        </>
    )
}