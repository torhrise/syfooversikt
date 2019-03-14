export const AlterstripeMedMelding = (melding: string) => {
  return (
    <AlertStripe
      className="oversiktContainer__alertstripe"
      type="advarsel"
    >
      <div>
        <p>{melding}</p>
      </div>
    </AlertStripe>
  );
};