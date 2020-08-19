import React from "react";

import { MemoryRouter, Router } from "react-router-dom";
import { mount } from "enzyme";

import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types";

describe("Prueba en <Navbar />", () => {
  const historyMock = {
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Daniel",
    },
  };

  const wrapper = mount(
    <MemoryRouter>
      <AuthContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </AuthContext.Provider>
    </MemoryRouter>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debe de renderizar correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de renderizar el nombre de usuario en el navbar ", () => {
    expect(wrapper.find(".text-info").text().trim()).toBe("Daniel");
  });

  test("Debe de cerrar sesion al presionar boton Logout ", () => {
    wrapper.find("button").prop("onClick")();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });
  });

  test("Debe de llamar al custom hook useHistory ", () => {
    wrapper.find("button").prop("onClick")();
    expect(historyMock.replace).toHaveBeenCalledWith("/login");
  });
});
