

export default function MovieForm() {

    const onSubmit = () => {
        console.log('in Submit');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Movie title"/>
                <input type="text" placeholder="Movie Poster URL"/>
                <input type="text" placeholder="Movie Description"/>
                <input type="submit"/>
            </form>
        </>
    )
}