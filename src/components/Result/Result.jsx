import "./Result.scss";
import { useState, useEffect } from "react";

const Result = ({result, onTryAgain, bangOnAnswers}) => {

    const [name, setName] = useState("");
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
      setHighScores(JSON.parse(localStorage.getItem("highScores"))) || [];
    }, []);

    const handleSave = () => {
      console.log("handleSave");

      const score = {
        name,
        score: result
      };

      console.log(score);

      const newHighScores = [...highScores, score].sort((a, b) => a.score - b.score);
      setHighScores(newHighScores);
      setShowScores(true);
      localStorage.setItem("highScores", JSON.stringify(newHighScores));
    }

    return (
      <div className="result">
        <h3>Result</h3>
        <p>
          Total Score: <span>{result}</span>
        </p>
        <p>
          Bang On Answers: <span>{bangOnAnswers}</span>
        </p>
        {/* <button onClick={onTryAgain}>Try again</button> */}
        {!showScores ? (<>
          <h4>
            Enter your name below to save your score!
          </h4>
          <input
            placeholder="Your name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
        ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((highScore, i) => {
                return (
                  <tr key={`${highScore.score}${highScore.name}${i}`}>
                    <td>{i + 1}</td>
                    <td>{highScore.name}</td>
                    <td>{highScore.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
        )}
      </div>

    );
}

export default Result;
