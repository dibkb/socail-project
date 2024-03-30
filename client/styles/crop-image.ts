const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "400px",
    minWidth: "400px",
    width: "30vw",
    height: "30vw",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    background: "#0c0a09",
    position: "relative",
  },
  controls: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: "100%",
    transform: "translateX(-50%)",
    height: "80px",
  },
  header: {
    position: "absolute",
    zIndex: 3002,
    top: 16,
    color: "white",
    left: "50%",
    width: "100%",
    transform: "translateX(-50%)",
  },
  footer: {
    position: "absolute",
    zIndex: 3002,
    bottom: 16,
    left: "50%",
    width: "100%",
    transform: "translateX(-50%)",
  },
};
export default styles;
