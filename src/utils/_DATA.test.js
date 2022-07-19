import { _getQuestions, _saveQuestion, _getUsers, _saveQuestionAnswer } from "../utils/_DATA";

describe("_getQuestions", () => {
  it("should return an Object of questions", async () => {
    const questions = await _getQuestions();
    expect(questions).toBeInstanceOf(Object);
    const keys = Object.keys(questions);
    expect(questions[keys[0]]).toHaveProperty("id");
    expect(questions[keys[0]]).toHaveProperty("author");
    expect(questions[keys[0]]).toHaveProperty("timestamp");
  });
});

describe("_getUsers", () => {
  it("should return an Object of users", async () => {
    const users = await _getUsers();
    expect(users).toBeInstanceOf(Object);
    const keys = Object.keys(users);
    expect(users[keys[0]]).toHaveProperty("id");
    expect(users[keys[0]]).toHaveProperty("name");
    expect(users[keys[0]]).toHaveProperty("avatarURL");
  });
});

describe("_saveQuestion", () => {
  it("should return an Object of questions", async () => {
    const question = {
      author: "test",
      optionOneText: "test",
      optionTwoText: "test",
    };
    const savedQuestion = await _saveQuestion(question);
    expect(savedQuestion).toBeInstanceOf(Object);
    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion).toHaveProperty("author");
    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion).toHaveProperty("optionOne");
    expect(savedQuestion).toHaveProperty("optionTwo");
    expect(savedQuestion.optionOne.text).toBe(question.optionOneText);
    expect(savedQuestion.optionTwo.text).toBe(question.optionTwoText);
    expect(savedQuestion.author).toBe(question.author);
  });

  it("should reject if question is missing optionOneText, optionTwoText, or author", async () => {
    const question = {
      optionOneText: "test",
      optionTwoText: "test",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return an Object of users", async () => {
    const authedUser = "test";
    const qid = "test";
    const answer = "optionOne";
    const savedQuestionAnswer = await _saveQuestionAnswer({ authedUser, qid, answer });
    expect(savedQuestionAnswer).toBeTruthy();
  });

  it("should reject if authedUser, qid, or answer is missing", async () => {
    const qid = "test";
    const answer = "test";
    await expect(_saveQuestionAnswer({ qid, answer })).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
