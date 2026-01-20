import { Outlet, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "./registerLayout.module.css"
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function RegisterLayout() {
    const navigate = useNavigate();
    const tabButtonSx = {
    width: "12rem",
    height: "48px",
    fontSize: "clamp(0.85rem, 2vw, 1rem)",
    textTransform: "none",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "#fff",

    "&:hover": {
        backgroundColor: "rgba(34,197,94,0.15)",
        borderColor: "#22c55e",
        color: "#fff"
    },

    "&.active": {
        backgroundColor: "#22c55e",
        color: "#0f172a",
        borderColor: "#22c55e",
        fontWeight: 600,
        },
    };



  return (
    <div className={styles.registerContainer}>

        <div className={styles.registerBox}>

            <div className={styles.formContainer}>
                <Button
                    type="button"
                    variant="text"
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={() => navigate(-1)}
                    sx={{
                        color: "#22c55e",
                        textTransform: "none",
                        alignSelf: 'flex-start'
                    }}
                    ></Button>
                <div className={styles.tabContainer}>
                    <h2>Registro</h2>
                    <div className={styles.registerTabs}>
                        <Button component={NavLink} to="user" sx={tabButtonSx} replace>Usuario</Button>
                        <Button component={NavLink} to="admin" sx={tabButtonSx} replace>Hospedaje</Button>
                        <Button component={NavLink} to="business" sx={tabButtonSx} replace>Empresa Recreativa</Button>
                    </div>
                </div>
                <Outlet />
            </div>

            <div className={styles.pictureWrapper}></div>

        </div>
    </div>
  );
}