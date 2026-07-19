import { useState } from "react"
import { agencies } from "./data/agencies";
import { normalize } from "./utils/normalize";

function App() {
  const [currentAgency, setCurrentAgency] = useState(() => {
    const initialIndex = Math.floor(Math.random() * agencies.length);
    return agencies[initialIndex];
  });

  const [agencyPool, setAgencyPool] = useState([...agencies]);

  const [answer, setAnswer] = useState("");

  function getNextAgency() {
    const updatedAgencyPool = agencyPool.filter(agency => agency.abbreviation !== currentAgency.abbreviation);
    
    const nextIndex = Math.floor(Math.random() * agencyPool.length);
    setCurrentAgency(updatedAgencyPool[nextIndex]);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setAnswer(value);

    if (normalize(answer) === normalize(currentAgency.fullName)) {
      getNextAgency();
    }
  }

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
            onChange={handleInputChange}
          />
        </section>
      </main>
    </>
  )
}

export default App