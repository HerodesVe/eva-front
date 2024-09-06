import React from "react";
import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";

interface DataTableProps {
    isHeaderActive?: boolean;
    columns: any[];
    data: any[];
    textAddButton?: string;
    onAddModal?: () => void;
    onUpdate?: (rowData: any) => void;
    onDelete?: (id: string) => void;
    onEye?: (rowData: any) => void;
    isExport?: boolean;
    isSearch?: boolean;
    isEyeDisabled?: (rowData: any) => boolean;
    children?: React.ReactNode;
}

export const DataTable = ({
    isHeaderActive = true,
    columns,
    data,
    textAddButton,
    onAddModal,
    onUpdate,
    onDelete,
    onEye,
    isExport,
    isSearch,
    isEyeDisabled,
    children,
}: DataTableProps) => {
    return (
        <SectionStructure>
            {isHeaderActive ? (
                <HeaderDataTable
                    isExport={isExport}
                    isSearch={isSearch}
                    textAddButton={textAddButton ? textAddButton : null}
                    onAddModal={onAddModal}
                />
            ) : null}

            {/* Tabla */}
            <PrimeDataTable
                columns={columns}
                data={data}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onEye={onEye}
                isEyeDisabled={isEyeDisabled}
            />

            {children ? <div>{children}</div> : null}
        </SectionStructure>
    );
};
