import React from "react";

import { mount } from "enzyme";
import { PrivateRoute } from "../../routers/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <PrivateRoute />", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };

  Storage.prototype.setItem = jest.fn();

  let wrapper = mount(
    <MemoryRouter>
      <PrivateRoute
        isAuth={true}
        component={() => <span>test</span>}
        {...props}
      />
    </MemoryRouter>
  );

  test("Debe de mostrar el componente solo si esta autenticado ", () => {
    expect(wrapper.find("span").exists()).toBe(true);
  });

  test("Debe de llamar el localStorage con argumentos ", () => {
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });

  test("Debe de bloquear el componente si no esta autenticado ", () => {
    wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuth={false}
          component={() => <span>test</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);
  });
});
