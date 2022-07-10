import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { allQuestionsAsArray } from "./questionsSlice";

export const Question = () => {
  let params = useParams();
  const id = params.id;
  const allQuestions = useSelector(allQuestionsAsArray);

  const question = allQuestions.find((question) => question.id === id);

  console.log(question);

  if (!question) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Poll by {question.author}</h1>
      <div> AVATAR </div>
      <div> Would you rather</div>
      <div> Question #1: {question.optionOne.text}</div>
      <div> Question #2: {question.optionTwo.text}</div>
    </div>
  );
};
export default Question;
