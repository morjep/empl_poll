import { useSelector, useDispatch } from "react-redux";
import { saveNewQuestion } from "./questionsSlice";
import { getAuthedUser } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

export const NewQuestion = () => {
  const authedUser = useSelector(getAuthedUser);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = e.target.elements;
    const optionOneTextValue = optionOne.value;
    const optionTwoTextValue = optionTwo.value;
    const author = authedUser;
    const question = {
      optionOneText: optionOneTextValue,
      optionTwoText: optionTwoTextValue,
      author: author,
    };
    dispatch(saveNewQuestion(question));
    e.target.reset();
    navigate("/");
  };

  return (
    <div>
      <h1>Create new poll</h1>
      <h2>Would you rather</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Option:</label>
          <input type="text" name="optionOne" placeholder="Option One" />
        </div>
        <div>
          <label>Second Option:</label>
          <input type="text" name="optionTwo" placeholder="Option Two" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default NewQuestion;
