import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Leaderboard } from "../components/Leaderboard";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { store } from "../app/store";

describe("Leaderboard", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Leaderboard />
        </ChakraProvider>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
