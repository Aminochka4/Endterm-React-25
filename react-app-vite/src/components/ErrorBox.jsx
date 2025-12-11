import "./ErrorBox.css";

export default function ErrorBox({ message }) {
  return (
    <div className="error-box">
      <p>{message}</p>
    </div>
  );
}
