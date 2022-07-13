import { useSelector, useDispatch } from "react-redux";
import { saveNewQuestion } from "../app/appSlice";
import { getAuthedUser } from "../app/usersSlice";
import { useNavigate } from "react-router-dom";

export const NewQuestion = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector(getAuthedUser);

  let navigate = useNavigate();

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