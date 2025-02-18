import { useState } from "react";
import { postDataProduct } from "../services/API";
import { useNavigate } from "react-router-dom";

const CreateNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    color: "",
    size: "",
    price: "",
  });

  const [message, setMessage] = useState(""); 
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Debes iniciar sesión para crear un producto.");
        return;
      }
      
      const result = await postDataProduct("api/products/create", formData, token);
      if (result) {
        setMessage("Producto creado exitosamente.");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage("Error al crear producto.");
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      setMessage("Hubo un error al procesar la solicitud.");
    }
  };
  

  return (
    <div>
      <h2>Añadir Nuevo Producto</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre </label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Descripción </label>
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Imagen </label>
          <input
            type="text"
            name="image"
            placeholder="URL Imagen"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Categoría </label>
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Color </label>
          <input
            type="text"
            name="color"
            placeholder="Azul"
            value={formData.color}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Tamaño </label>
          <input
            type="text"
            name="size"
            placeholder="S"
            value={formData.size}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Precio </label>
          <input
            type="number"
            name="price"
            placeholder="9.9"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateNew;