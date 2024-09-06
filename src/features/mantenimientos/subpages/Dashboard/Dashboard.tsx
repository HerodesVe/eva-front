import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.css";
import { Chart } from "primereact/chart";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { DashboardCliente } from "./components/DashboardCliente/DashboardCliente";
import api from "@/connections";
import { DashboardAdmin } from "./components/DashboardAdmin/DashboardAdmin";

export function Dashboard() {
  const authState = useSelector((state: RootState) => state.auth.usuario);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [periodo, setPeriodo] = useState("mes");
  const [data, setData] = useState({}); 

  console.log(authState)

  const fetchData = async () => {
    try {
      const response = await api.post(`/servicio/getDashboardCliente/${authState?.uid}`, {
        id: authState?.uid,
        periodo: periodo,
      });
      console.log(response.data);
      const { totales } = response.data;
      setData(totales);

      // Configurar los datos del gráfico
      const chartData = {
        labels: ["Gastos", "Ventas", "Sueldos Bancos", "Cuentas por Cobrar", "Cuentas por Pagar", "Resumen de Impuestos"],
        datasets: [
          {
            label: "Totales",
            data: [
              totales.gastos,
              totales.ventas,
              totales.sueldos_bancos,
              totales.cuentas_cobrar,
              totales.cuentas_pagar,
              totales.resumen_impuestos,
            ],
            backgroundColor: [
              "rgba(255, 159, 64, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(7, 74, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 159, 64)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(255, 206, 86)",
              "rgb(20, 83, 209)",
            ],
            borderWidth: 1,
          },
        ],
      };

      // Configurar las opciones del gráfico
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      setChartData(chartData);
      setChartOptions(options);
    } catch (error) {
      console.error("Error al obtener los datos del cliente:", error);
    }
  };

  useEffect(() => {
    if (authState?.uid) {
      fetchData();
    }
  }, [authState?.uid, periodo]); 

  return (
    <MainContentStructure titleText="">
      {authState?.role === "CLIENTE" && (
      <>
        <DashboardCliente data={data} setPeriodo={setPeriodo} periodo={periodo} />
         <br />
      <div className={style.dashboard__graficos}>
        <ContentBox>
          <Chart type="bar" data={chartData} options={chartOptions} />
        </ContentBox>

        <ContentBox>
          <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </ContentBox>
      </div>
      </>
      )}

      {authState?.role === "ADMIN" && (
<DashboardAdmin />
      )}
     
    </MainContentStructure>
  );
}
