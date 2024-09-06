import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { useModal } from "@/hooks/useModal";

interface Usuario {
  nombre: string;
  correo: string;
  role: string;
  experiencia: string;
  clientes: string[];
  uid: string;
  fecha_nacimiento?: string;
  imgContadora?: string;
  especialidad?: string;
}

interface Data {
  total: number;
  usuarios: Usuario[];
}

export const ListaContadoras: React.FC = () => {
  const { data, reloadFetchData } = useGetFetch<Data>("user/getContadoras");
  const navigate = useNavigate();
  const addModal = useModal();
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const handleClientRedirect = (id: any) => {
    navigate(`/lista-contadoras/perfil/${id}`);
  };

  const handleEditUser = (user: Usuario) => {
    setSelectedUser(user);
    addModal.onVisibleModal();
  };

  return (
    <>
      <MainContentStructure titleText="Lista de contadoras">
        <DataTable
          columns={columns}
          data={data?.usuarios}
          textAddButton="Crear contadora"
          onAddModal={() => {
            setSelectedUser(null);
            addModal.onVisibleModal();
          }}
          isSearch={true}
          onEye={(rowData: Usuario) => {
            handleClientRedirect(rowData?.uid);
          }}
          onUpdate={(rowData: Usuario) => {
            handleEditUser(rowData);
          }}
        />
      </MainContentStructure>

      <PrimeModal
        header="Crear contadora"
        modalStatus={addModal.modalStatus}
        onHideModal={addModal.onHideModal}
        width={800}
      >
        <AddModal onHideModal={addModal.onHideModal} existingData={selectedUser} reloadFetchData={reloadFetchData} />
      </PrimeModal>
    </>
  );
};

const columns = [
  { nombre: "Nombre", campo: "nombre" },
  { nombre: "Correo", campo: "correo" },
  { nombre: "N. Clientes", campo: "clientes", body: (rowData: Usuario) => rowData.clientes.length },
];
