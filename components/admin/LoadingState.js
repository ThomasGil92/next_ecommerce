import { motion } from "framer-motion";

const LoadingState = () => {
  return (
    <>
      <div
        style={{ top: "0px", zIndex: "5000", backgroundColor: "white" }}
        className="vw-100 vh-100 position-absolute d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
          >
            <i className="fas fa-circle-notch fa-5x"></i>
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default LoadingState;
