import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workouts = { title, load, reps }

        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workouts),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                const text = await response.text();
                const json = text && JSON.parse(text);
                setError(json ? json.error : 'Unknown error occurred');
                setEmptyFields(json.emptyFields)
                return;
            }

            const text = await response.text();
            let json = null;
            if (text) {
                json = JSON.parse(text);
            }

            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        } catch (error) {
            setError('Failed to add workout: ' + error.message)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error': ''}
            />

            <label>Load (in Kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error': ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error': ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
