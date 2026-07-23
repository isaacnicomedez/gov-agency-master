import "../styles/components/StartScreen.css";

export default function StartScreen({ onStart }: { onStart: () => void }) {
    return (
        <section className="main-container">
            <div className="start-card">
                <h1>🇵🇭 Government Agency Quiz</h1>

                <p>
                    Test your knowledge of Philippine government agencies by
                    typing their complete names.
                </p>

                <button
                    className="start-btn"
                    onClick={onStart}
                >
                    Start Quiz
                </button>
            </div>
        </section>
    );
}