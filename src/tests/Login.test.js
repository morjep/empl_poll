import { fireEvent, render, screen } from "@testing-library/react";
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

  it("should render the login form with error", () => {
    render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Login />
        </ChakraProvider>
      </Provider>
    );
    let username = screen.getByRole("username");
    let password = screen.getByRole("password");
    let login = screen.getByRole("login");
    expect(screen.queryByRole("loginError")).not.toBeInTheDocument();
    fireEvent.change(username, { target: { value: "test" } });
    fireEvent.change(password, { target: { value: "test" } });
    fireEvent.click(login);
    expect(screen.getByRole("loginError")).toBeInTheDocument();
  });
});
