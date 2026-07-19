import { useState } from "react"
import { agencies } from "./data/agencies";

function App() {
  const [currentAgency, setCurrentAgency] = useState(() => {
    const initialIndex = Math.floor(Math.random() * agencies.length);
    return agencies[initialIndex];
  });

  const [agencyPool, setAgencyPool] = useState([...agencies]);

  const [answer, setAnswer] = useState("");

  return (
    <>
      <main>
        <section>
          <p>{currentAgency.abbreviation}</p>
          <p>What does it stands for?</p>
        </section>
        <section>
          <input 
            type="text" 
            placeholder="Type full name here..." 

            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
        </section>
      </main>
    </>
  )
}

export default App