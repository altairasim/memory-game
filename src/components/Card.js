import { useEffect, useState } from "react";
import "./card.css";

const Card = () => {
  const [cardData, setCardData] = useState();
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(false);

  const cards = [
    { id: 1, value: "A" },
    { id: 2, value: "B" },
    { id: 3, value: "C" },
    { id: 4, value: "D" },
    { id: 5, value: "E" },
    { id: 6, value: "F" },
  ];
  useEffect(() => {
    const shuffleArray = (array) => {
      const newArray = array.concat(
        array.map((obj) => ({ ...obj, id: obj.id + array.length }))
      );

      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setCardData(shuffleArray(cards));
  }, []);

  useEffect(() => {
    function gameOver() {
      if (score === 6) {
        alert(`Congratulations! you completed in ${moves} moves`);
        window.location.reload();
        return;
      } else {
        return;
      }
    }
    gameOver();
  }, [score]);

  useEffect(() => {
    if (clickedCards.length == 1) {
    } else if (
      clickedCards.length == 2 &&
      clickedCards[0].id == clickedCards[1].id
    ) {
      setClickedCards((preClickedCards) => [...preClickedCards.slice(0, -1)]);
    } else if (
      clickedCards.length == 2 &&
      clickedCards[0].innerText === clickedCards[1].innerText
    ) {
      setTimeout(() => {
        clickedCards[0].classList.add("complete");
        clickedCards[1].classList.add("complete");
        setMatched(matched + 2);
        setScore(score + 1);
        setMoves(moves + 1);
        setClickedCards([]);
      }, 500);
    } else if (
      clickedCards.length == 2 &&
      clickedCards[0].innerText !== clickedCards[1].innerText
    ) {
      setMoves(moves + 1);
      setTimeout(() => {
        clickedCards[0].classList.remove("show");
        clickedCards[1].classList.remove("show");
        setClickedCards([]);
      }, 1000);
    }
    return;
  }, [clickedCards.length]);

  function clickCard(evt) {
    if (clickedCards.length < 2) {
      evt.target.classList.add("show");
      const clickedCard = evt.target;
      setClickedCards((prevClickedCards) => [...prevClickedCards, clickedCard]);
    } else {
      setClickedCards([]);
    }
  }

  function restart() {
    window.location.reload();
  }
  return (
    <div className="container">
      <div className="board">
        {cardData &&
          cardData.map((data) => {
            return (
              <div
                onClick={clickCard}
                id={data.id}
                key={data.id}
                className="card"
              >
                {data.value}
              </div>
            );
          })}
      </div>
      <div className="score">{`Score: ${score}   Moves: ${moves}`}</div>
      <input type="button" id="btn" value="Restart" onClick={restart} />
    </div>
  );
};
export default Card;
