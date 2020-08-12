import React, { useMemo } from "react";
import { getHeroById } from "../../selectors/getHeroById";
import { useParams, Redirect } from "react-router-dom";

export const HeroScreen = ({ history }) => {
  const { heroeId } = useParams();

  const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

  if (!hero) {
    return <Redirect to="/" />;
  }

  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
  } = hero;

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push("/");
    } else {
      history.goBack();
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`../assets/heroes/${heroeId}.jpg`}
          className="img-thumbnail animate__animated animate__fadeInLeft"
          alt={superhero}
        />
      </div>
      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: {alter_ego}</b>
          </li>
          <li className="list-group-item">
            <b>Publisher: {publisher}</b>
          </li>
          <li className="list-group-item">
            <b>First appearance: {first_appearance}</b>
          </li>
        </ul>
        <h5 className="mt-5 ml-3">Characters</h5>
        <p className="ml-3">{characters}</p>
        <button
          className="btn btn-outline-info mt-5 ml-3"
          onClick={handleReturn}
        >
          Return
        </button>
      </div>
    </div>
  );
};
