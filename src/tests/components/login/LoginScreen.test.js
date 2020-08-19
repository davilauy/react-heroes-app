import React from "react";
import { mount } from "enzyme";

import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types";

describe("Pruebas en <LoginScreen />", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  const historyMock = {
    replace: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debe de renderizar correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de ejecutar el dispatch ", () => {
    wrapper.find("button").prop("onClick")();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Daniel",
      },
    });
  });

  test("Debe de llamar a la funcion replace luego de hacer Login ", () => {
    wrapper.find("button").prop("onClick")();
    expect(historyMock.replace).toHaveBeenCalled();
  });

  test("Debe de obtener lastPath con el valor: / ", () => {
    wrapper.find("button").prop("onClick")();
    expect(historyMock.replace).toHaveBeenCalledWith("/");
  });

  test("Debe de obtener lastPath con un valor obtenido desde localStorage ", () => {
    localStorage.setItem("lastPath", "/marvel");
    wrapper.find("button").prop("onClick")();
    expect(historyMock.replace).toHaveBeenCalledWith("/marvel");
  });
});
