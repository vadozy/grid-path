import React from 'react';

const Feedback = ({ show }) => {

  if (!show) return null;

  const random = Math.floor(Math.random() * Math.floor(losingTheGameQuotes.length));
  
  return <div className="ai-feedback">
    <span style={{fontSize: '1.2em', color: 'red'}}>No path found. </span>
    {losingTheGameQuotes[random]}
  </div>

}

export default Feedback

const losingTheGameQuotes = [
  "When you play Bobby, it is not a question if you win or lose. It is a question if you survive. - Boris Spassky",
  "We're gracious and we're humble, and we play the game a certain way, whether we win or lose. - Megan Rapinoe",
  "I can't say, 'It doesn't matter if you win or lose.' It's not true. You go in to win. - Katarina Witt",
  "Sometimes it is better to lose and do the right thing than to win and do the wrong thing. - Tony Blair",
  "I get more upset at losing at other things than chess. I always get upset when I lose at Monopoly. - Magnus Carlsen",
  "I do not try to dance better than anyone else. I only try to dance better than myself. - Mikhail Baryshnikov",
  "Just play. Have fun. Enjoy the game. - Michael Jordan",
  "I love the winning, I can take the losing, but most of all I Love to play - Boris Becker",
  "I would prefer even to lose with honor than to win by cheating. - Sophocles",
];
