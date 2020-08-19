import React from "react";
import { shallow, mount } from "enzyme";
import { HeroScreen } from "../../../components/heroes/HeroScreen";
import { MemoryRouter, Route } from "react-router-dom";

describe("Pruebas en <HeroScreen />", () => {
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test("Debe de renderizar el componente Redirect si no existen argumentos en URL ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );

    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("Debe de renderizar un hero si se pasa el argumento por URL ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".row").exists()).toBe(true);
    expect(
      wrapper
        .find("img")
        .hasClass("img-thumbnail animate__animated animate__fadeInLeft")
    ).toBe(true);
  });

  test("Debe de llamar a la funcion PUSH ", () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();
    expect(historyMock.push).toHaveBeenCalledWith("/");
  });

  test("Debe de llamar a la funcion goBack ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();
    expect(historyMock.goBack).toHaveBeenCalled();
  });
});
