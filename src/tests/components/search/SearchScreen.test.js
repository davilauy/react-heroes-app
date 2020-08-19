import React from "react";
import { MemoryRouter, Route } from "react-router-dom";

import { mount } from "enzyme";

import { SearchScreen } from "../../../components/search/SearchScreen";

describe("Pruebas en <SearchScreen />", () => {
  test("Debe de renderizar correctamente con valores por defecto ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });

  test("Debe de completar el input search con el valor enviado por URL ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=bat"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("bat");
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de mostrar un error si no se encuentra hero ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batttt"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      "There is no a hero with batttt"
    );
  });

  test("Debe de llamar la funcion PUSH ", () => {
    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batttt"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "searchText",
        value: "batman",
      },
    });

    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith("?q=batman");
  });
});
