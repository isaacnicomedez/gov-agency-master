import { useState } from "react";
import { agencies } from "./data/agencies";
import { normalize } from "./utils/normalize";
import type { Agency } from "./types/agencies";
import type { ChangeEvent, KeyboardEvent } from "react";

function App() {
  const [currentAgency, setCurrentAgency] = useState<Agency>(() => {
    const initialIndex = Math.floor(Math.random() * agencies.length);
    return agencies[initialIndex];
  });

  const [agencyPool, setAgencyPool] = useState<Agency[]>([...agencies]);
  const [answer, setAnswer] = useState<string>("");

  function getNextAgency(currentPool: Agency[]) {
    const updatedAgencyPool = currentPool.filter(
      (agency) => agency.abbreviation !== currentAgency.abbreviation
    );

    if (updatedAgencyPool.length === 0) {
      return;
    }

    const nextIndex = Math.floor(Math.random() * updatedAgencyPool.length);
    setCurrentAgency(updatedAgencyPool[nextIndex]);
    setAgencyPool(updatedAgencyPool);
    setAnswer("");
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setAnswer(value);

    if (normalize(value) === normalize(currentAgency.fullName)) {
      getNextAgency(agencyPool);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") getNextAgency(agencyPool);
  }

  return (
    <main>
      <section>
        <p>{agencyPool.length}</p>
        <p>{currentAgency.abbreviation}</p>
        <p>What does it stand for?</p>
      </section>
      <section>
        <input
          type="text"
          placeholder="Type full name here..."
          value={answer}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </section>
    </main>
  );
}

export default App;