import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";

interface PropsAddModal {
  onHideModal?: () => void;
  existingData?: any;
  reloadFetchData?: () => void;
}

export const AddModal = ({ onHideModal, existingData ,reloadFetchData}: PropsAddModal) => {
  const [newData, setNewData] = useState<any>({
    nombre: "",
    correo: "",
    contraseña: "",
    experiencia: "",
    fecha_nacimiento: "",
    codigo_colegiala: "",
    role: "CONTADORA",
    imgContadora: "",
  });

  const { postFetchData } = usePostFetch("user", {
    sectionName: "Contadora",
    addModal: { onHideModal },
    reloadFetchData,
  });

  const { updateFetchData } = useUpdateFetch(
    "user/actualizarContadora",
    "Contadora",
	reloadFetchData,
    { onHideModal }
  );

  useEffect(() => {
    if (existingData) {
      setNewData(existingData);
    }
  }, [existingData]);

  const handleCreate = async () => {
    await postFetchData(newData);
  };

  const handleUpdate = async () => {
    if (existingData && existingData.uid) {
      await updateFetchData(existingData.uid, newData);
    }
  };

  const handleImageUpload = (base64Image: string) => {
    setNewData((prevData: any) => ({ ...prevData, imgContadora: base64Image }));
  };

  console.log(newData);

  return (
    <div className={style.column__container}>
      <TextBoxField
        textLabel="Nombre"
        value={newData.nombre || ""}
        name="nombre"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Correo"
        value={newData.correo || ""}
        name="correo"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Contraseña"
        value={newData.contraseña || ""}
        name="contraseña"
        type="password"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Experiencia"
        value={newData.experiencia || ""}
        name="experiencia"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <PrimeCalendar
        label="Fecha de Nacimiento"
        value={newData.fecha_nacimiento || ""}
        onChange={(e) => handleChangeInput(e, setNewData)}
        name="fecha_nacimiento"
      

      />

      <TextBoxField
        textLabel="Codigo Colegiala"
        value={newData.codigo_colegiala || ""}
        name="codigo_colegiala"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

<ImageUploader
  existingImage={newData.imgContadora}
  onImageUpload={handleImageUpload}
  label="Seleccionar Imagen"
/>

      {!existingData && (
        <Button  style={{display:"flex", justifyContent:"center", fontWeight:"bold"}} className="p-button-sm p-button-info mr-2 " onClick={handleCreate}>
          AGREGAR USUARIO
        </Button>
      )}

      {existingData && (
        <Button style={{display:"flex", justifyContent:"center", fontWeight:"bold"}} className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
          EDITAR USUARIO
        </Button>
      )}
    </div>
  );
};
