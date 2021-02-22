import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { setTheme } from "../../redux/actions";

export const ThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const [state, setState] = useState({
    isOn: theme && theme === "dark",
  });

  const flipSwitch = () => {
    if (!localStorage.getItem("theme")) {
      if (theme === "light") {
        dispatch(setTheme("dark"));
        localStorage.setItem("theme", "dark");
      } else {
        dispatch(setTheme("light"));
        localStorage.setItem("theme", "light");
      }
      setState({
        isOn: !state.isOn,
      });
    }

    if (localStorage.getItem("theme")) {
      if (theme === "light") {
        dispatch(setTheme("dark"));
        localStorage.setItem("theme", "dark");
      } else {
        dispatch(setTheme("light"));
        localStorage.setItem("theme", "light");
      }
      setState({
        isOn: !state.isOn,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "dark") {
        setState({
          isOn: true,
        });
      }
      dispatch(setTheme(localStorage.getItem("theme")));
    }
  }, []);

  return (
    <li
      title="modifier le thème"
      className="nav-item mr-2 d-flex align-items-center"
      style={{cursor:"pointer"}}
    >
      <motion.div
        style={{
          height: "30px",
          width: "60px",
          borderRadius: "25px",
        }}
        center
        onTap={flipSwitch}
        variants={{
          off: { background: "#ffffff", border: "1px solid #BBBBBB" },
          on: { background: "#0070DF" },
        }}
        initial={state.isOn ? "on" : "off"}
        animate={state.isOn ? "on" : "off"}
        transition={{
          type: "tween",
          duration: 0.2,
        }}
        className="d-flex align-items-center"
      >
        <motion.div
          style={{
            height: "37px",
            width: "37px",
            borderRadius: "100%",
            backgroundColor: theme === "dark" ? "#00488e" : "#343a40",
          }}
          variants={{
            off: { x: -5 },
            on: { x: 30 },
          }}
          transition={{
            type: "tween",
            duration: 0.1,
          }}
        />
      </motion.div>
    </li>
  );
};

