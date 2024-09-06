import React from "react";
import styles from "./DashboardCliente.module.css";
import { SelectField } from "@/components/SelectField/SelectField";

export const DashboardCliente = ({ data, setPeriodo, periodo }) => {
    const handlePeriodoChange = (event) => {
        setPeriodo(event.target.value);
      };
  return (
    <div className={styles.container}>
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
        <h1>Dashboard Cliente</h1>

<div style={{width:"10%"}}>
<SelectField
            name="mes"
            textLabel=""
            placeholder="Seleccione un periodo"
            value={periodo}
            onChange={handlePeriodoChange} // Actualizar el periodo cuando el usuario selecciona uno nuevo
            options={[
              { name: "Mes", value: "mes" },
              { name: "3 Meses", value: "3meses" },
              { name: "6 Meses", value: "6meses" },
            ]}
          />
</div>
          
        </div>

      <div className={styles.cardContainer}>
     
        <div className={styles.card}>
          <p className={styles.pTitle}>Cuentas por cobrar</p>
          <span className={styles.mountTitle}>{`S/${data.cuentas_cobrar}`}</span>

          <div className={styles.descriptionContainer}>
            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#32D399",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#32D399",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <p className={styles.descriptionTitle}>Vigentes</p>
                  <span className={styles.mountdescription}>S/0.00</span>
                  <span className={styles.descriptionDocument}>
                    0 documentos
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#EF4444",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#EF4444",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <p className={styles.descriptionTitle}>Vencidas</p>
                  <span className={styles.mountdescription}>S/0.00</span>
                  <span className={styles.descriptionDocument}>
                    0 documentos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.pTitle}>Cuentas por pagar</p>
          <span className={styles.mountTitle}>{`S/${data.cuentas_pagar}`}</span>

          <div className={styles.descriptionContainer}>
            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#32D399",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#32D399",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <p className={styles.descriptionTitle}>Vigentes</p>
                  <span className={styles.mountdescription}>S/0.00</span>
                  <span className={styles.descriptionDocument}>
                    0 documentos
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#EF4444",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#EF4444",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <p className={styles.descriptionTitle}>Vencidas</p>
                  <span className={styles.mountdescription}>S/0.00</span>
                  <span className={styles.descriptionDocument}>
                    0 documentos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
