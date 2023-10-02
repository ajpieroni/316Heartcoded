import "./PersonTab.css";

const PersonTab = ({
  personName = "FirstName LastName",
  description = "Brief intro to each member: Viens-tu du ciel profond ou sors-tu de l'abîme, Ô Beauté ! ton regard, infernal et divin, Verse confusément le bienfait et le crime, Et l'on peut pour cela te comparer au vin.",
}) => {
  return (
    <div className="staff-member">
      <img
        src="#"
        aria-hidden="false"
        id="placeholder-image"
        alt={"Image of " + personName}
      ></img>
      <div className="person-info">
        <h3>{personName}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PersonTab;
