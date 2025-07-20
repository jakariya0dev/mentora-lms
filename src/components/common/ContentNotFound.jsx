export default function ContentNotFound({ title = "Content Not Found" }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold px-5 py-16">{title}</p>
    </div>
  );
}
