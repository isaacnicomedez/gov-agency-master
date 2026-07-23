import "../styles/components/StartScreen.css";

export default function StartScreen({ onStart }: { onStart: () => void }) {
    return (
        <div className="main-container">
            <button className="start-btn" onClick={onStart}>
                Start
            </button>
        </div>
    )
}