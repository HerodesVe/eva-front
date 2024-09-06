import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadField } from '../UploadField/UploadField';
import { CustomButton } from '../CustomButton/CustomButton';

interface ExcelUploaderProps {
  onUpload: (data: any) => void;
}

export const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  // Definir el enum o estructura que representa los campos del Excel
  const enum Fields {
    GASTOS = "gastos",
    VENTAS = "ventas",
    SUELDOS_BANCOS = "sueldos_bancos",
    CUENTAS_COBRAR = "cuentas_cobrar",
    CUENTAS_PAGAR = "cuentas_pagar",
    RESUMEN_IMPUESTOS = "resumen_impuestos",
  }

  const handleFileUpload = async (fileData: { name: string; base64: string }) => {
    setIsUploading(true);

    try {
      // Convertir el base64 a un ArrayBuffer para poder procesarlo con xlsx
      const byteCharacters = atob(fileData.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const workbook = XLSX.read(byteArray, { type: 'array' });

      // Leer la primera hoja del Excel
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convertir los datos a formato JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Agregar un log para ver cómo se convierte el Excel a JSON
      console.log("Datos JSON convertidos desde Excel:", jsonData);

      // Mapear los datos según las filas y columnas del Excel y el enum proporcionado
      const mappedData = jsonData.map((row: any) => {
        return {
          [Fields.GASTOS]: row['Gastos'] || 0,
          [Fields.VENTAS]: row['Ventas'] || 0,
          [Fields.SUELDOS_BANCOS]: row['Sueldos en Bancos'] || 0,
          [Fields.CUENTAS_COBRAR]: row['Cuentas por Cobrar'] || 0,
          [Fields.CUENTAS_PAGAR]: row['Cuentas por Pagar'] || 0,
          [Fields.RESUMEN_IMPUESTOS]: row['Resumen de Impuestos'] || 0,
        };
      });

      // Enviar los datos mapeados al backend
      onUpload(mappedData);
    } catch (error) {
      console.error('Error al procesar el archivo Excel:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/public/Template Eva.xlsx"; 
    link.setAttribute("download", "Template Eva.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      flexDirection: "column",
    }}>
      <UploadField
        textLabel="Seleccionar Archivo Excel"
        name="excelFile"
        onUpload={handleFileUpload}
        isUploading={isUploading}
        fileExtensions=".xls,.xlsx" // Solo archivos de Excel
        uploadUrl="" // No se usa en este caso
        direction='row'
        labelWidth="400px"
      />

<CustomButton
      text="Descargar Template"
      backgroundButton="var(--primary-color-app)"
      colorP="#fff"
      onClick={handleDownloadTemplate}
      />
    </div>
  );
};
