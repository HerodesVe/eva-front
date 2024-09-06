import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setLogin, setRole, setLoading, setToken, setUsuario } from "@/store/slices/auth";
import { setToast } from "@/store/slices/toast";
import { url } from "@/connections/mainApi.js";

export const Login: React.FC = () => {
    const [user, setUser] = useState<any>({
        correo: "",
        contraseña: "",
    });
    const [error, setError] = useState<Error | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        dispatch(setLoading(true));
        setError(null);
        try {
            const response = await axios.post(`${url}auth/login`, user);
            const data = response.data;
            localStorage.setItem("rt__eva__backoffice", data.token);

            dispatch(setLogin(true));
            dispatch(setRole(data.usuario.role.toLowerCase()));
            dispatch(setToken(data.token));
            dispatch(setUsuario(data.usuario));

            dispatch(setToast({
                severity: "success",
                summary: "Login exitoso",
                detail: `Bienvenido ${data.usuario.nombre}`,
            }));

            navigate("/dashboard"); // O la ruta que corresponda

        } catch (error: any) {
            setError(error);
            dispatch(setToast({
                severity: "error",
                summary: "Error de login",
                detail: "Correo o contraseña incorrectos",
            }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.overlayContainer}>
                <div className={styles.overlay}></div>
            </div>

            <div className={`${styles.form__container__layout}`}>
                <div className={`${styles.form__container}`}>
                    <div
                        style={{
                            width: "200px",
                            margin: "0 auto",
                        }}
                    >
                        <img
                            src="/src/assets/LogoDefault.png"
                            alt=""
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                    </div>

                    <p className={styles.form__title}>Iniciar sesión</p>
                    <TextBoxField
                        textLabel="Correo:"
                        value={user.correo}
                        name={"correo"}
                        onChange={(e) =>
                            setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                        }
                    />
                    <TextBoxField
                        textLabel="Contraseña:"
                        value={user.contraseña}
                        name={"contraseña"}
                        onChange={(e) =>
                            setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                        }
                        type="password"
                    />

                    <CustomButton
                        text="INGRESAR"
                        backgroundButton="var(--primary-color-app)"
                        colorP="#fff"
                        onClick={handleLogin}
                    />

              
                </div>
            </div>
        </div>
    );
};
