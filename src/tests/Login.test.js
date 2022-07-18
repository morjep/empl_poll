import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Login } from "../components/Login";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { store } from "../app/store";

describe("Login", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Login />
        </ChakraProvider>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the login form", () => {
    render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Login />
        </ChakraProvider>
      </Provider>
    );
    expect(screen.getByRole("username")).toBeInTheDocument();
    expect(screen.getByRole("password")).toBeInTheDocument();
    expect(screen.getByRole("login")).toBeInTheDocument();
  });
});
