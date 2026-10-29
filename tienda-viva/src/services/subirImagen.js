const CLOUD_NAME = "dfi8uioig";
const UPLOAD_PRESET = "tienda_viva";

export const subirImagen = async (archivo) => {
  const formData = new FormData();
  formData.append("file", archivo);
  formData.append("upload_preset", UPLOAD_PRESET);

  const respuesta = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!respuesta.ok) {
    throw new Error("No se pudo subir la imagen");
  }

  const datos = await respuesta.json();

  return datos.secure_url;
};
