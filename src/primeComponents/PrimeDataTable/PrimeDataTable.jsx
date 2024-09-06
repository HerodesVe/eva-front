import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable as PrimeReactDataTable } from "primereact/datatable";



export const PrimeDataTable = ({ columns, data, onUpdate, onDelete, onEye, isEyeDisabled }) => {
    const [dataTable, setDataTable] = useState(data);

    useEffect(() => {
        setDataTable(data);
    }, [data]);

    const buttonSuccess = (rowData) => {
        return (
            <Button
                className="p-button-info p-button-rounded"
                style={{ width: "40px", height: "40px" }}
                type="button"
                icon="pi pi-pencil"
                onClick={() => onUpdate(rowData)}
            />
        );
    };

    const buttonDecline = (rowData) => {
        return (
            <Button
                className="p-button-danger p-button-rounded"
                style={{ width: "40px", height: "40px" }}
                type="button"
                icon="pi pi-ban"
                onClick={() => {
                    onDelete(rowData.id);
                }}
            />
        );
    };

    const buttonEye = (rowData) => {
        return (
            <Button
                className="p-button-help p-button-rounded"
                style={{ width: "40px", height: "40px" }}
                type="button"
                icon="pi pi-eye"
                onClick={() => onEye(rowData)}
                disabled={isEyeDisabled ? isEyeDisabled(rowData) : false}
            />
        );
    };

    return (
        <PrimeReactDataTable
            value={dataTable}
            paginator
            rows={5}
            dataKey="id"
            emptyMessage="No se han encontrado resultados."
        >
            {columns &&
                columns.map((column) => (
                    <Column
                        key={`${column.campo}`}
                        sortable
                        field={column.campo}
                        body={column.body}
                        header={column.nombre}
                        style={{ minWidth: "10rem" }}
                    />
                ))}

            {onUpdate && <Column style={{ width: "5rem" }} body={buttonSuccess} />}
            {onEye && <Column style={{ width: "5rem" }} body={buttonEye} />}
            {onDelete && <Column style={{ width: "5rem" }} body={buttonDecline} />}
        </PrimeReactDataTable>
    );
};
