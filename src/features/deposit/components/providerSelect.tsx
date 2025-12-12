type Provider = "mtn" | "airtel";

export default function ProviderRadioGroup({
  value,
  onChange
}: {
  value: Provider;
  onChange: (val: Provider) => void;
}) {
  return (
    <section className="space-y-3">
      <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer">
        <input
          type="radio"
          checked={value === "mtn"}
          onChange={() => onChange("mtn")}
        />
        <span>MTN Mobile Money</span>
      </label>

      <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer">
        <input
          type="radio"
          checked={value === "airtel"}
          onChange={() => onChange("airtel")}
        />
        <span>Airtel Money</span>
      </label>
    </section>
  );
}
