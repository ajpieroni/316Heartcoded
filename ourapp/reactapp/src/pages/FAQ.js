import React, { useState, useEffect } from 'react';
import './FAQ.css';
import { useMediaQuery } from "@mui/material";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Question component method
  const Question = ({ actInd = 0, questionText, answerText }) => (
    <li
      tabIndex="0"
      className={`question-wrapper ${activeIndex === actInd ? 'active' : ''}`}
      onClick={() => handleQuestionClick(actInd)}
    >
      <p className="question">
        <span className={`dropper ${activeIndex === actInd ? 'rotate' : ''}`}>
          {activeIndex === actInd ? '⏷' : '⏵'}
        </span>
        {questionText}
        <span className="sr-only">Click to expand</span>
      </p>
      {activeIndex === actInd && <p className="answer">{answerText}</p>}
    </li>
  );
  

  return (
    <div className={`FAQ ${isMobile ? 'mobile' : ''}`}>
      <div className="content-wrapper">
        <h1 className="page-title">FAQ</h1>
        <ul tabIndex="0" aria-label="FAQs">
        <Question actInd={0} questionText={"Where can I find my box number?"} answerText={"Log into your package hub on this site using your netid and password and your box number will be displayed on your user hub!"} />
        <Question actInd={1} questionText="How do I pick up a package?" answerText="Head to the Student Mail Center in the Bryan Center basement with your box number and number of boxes ready. When you get to the front, tell both of these to a mail center staff member, then scan your ID once you get your box(es). That's it!" />
        <Question actInd={2} questionText="Can someone pick up a package for me?" answerText="The short answer is, yes. You won't be able to schedule a package pickup if you're not the one physically getting your box, but someone can pick up a package for you in the regular mail line as long as they have a text from you stating your name, box number, their name, and explicit permission for them to pick up your package." />
        <Question actInd={3} questionText="Why is my tracking number different than the one my carrier sent me?" answerText="If you order a package through a private carrier, the tracking is marked as delivered once it reaches Duke's central mail processing warehouse. It is then assigned a new tracking number internal to Duke that shows whether it's arrived at the mail center yet or not! If you use a public carrier, the tracking number should be the same either way." />
        <Question actInd={4} questionText="Can I checkout a caddy to help move larger packages?" answerText="Yes, free of cost, though the mail center only has limited caddies to loan out." />
        <Question actInd={5} questionText="Where can I pick up my mail key?" answerText="L figure it out, bozo." />
        <Question actInd={6} questionText="I want to close my box, how can I do that?" answerText="L figure it out, bozo." />
        <Question actInd={7} questionText="Where can I apply to work at the mail center?" answerText="L figure it out, bozo." />
        <Question actInd={8} questionText="When is the mail center open?" answerText="L figure it out, bozo." />
        <Question actInd={9} questionText="What happens if I don't pick up a package?" answerText="L figure it out, bozo." />
        </ul>
      </div>
    </div>

  );
};

export default FAQ;
