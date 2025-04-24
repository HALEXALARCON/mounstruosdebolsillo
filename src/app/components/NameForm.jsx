import { useRef } from "react";
import { useName, types } from "../../contexts/NameContext";
import { useNavigate } from "react-router-dom";

function NameForm() {
  const [state, dispatch] = useName();
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleSummit = () => {
    if (!inputRef.current.value) return;
    dispatch({
      type: types.set_name,
      payload: inputRef.current.value
    });
    navigate("/pokedex");
    inputRef.current.value = '';
  };

  return (
    <div>
      <input
        type="text"
        className="input"
        placeholder="Tu Nombre"
        ref={inputRef}
        onKeyDown={(e) => e.key === "Enter" && handleSummit()}
      />
      <button className="btn" onClick={handleSummit}>
        Iniciar
      </button>
    </div>
  );
}

export default NameForm;
