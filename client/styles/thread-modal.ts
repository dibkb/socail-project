const styles: Record<string, React.CSSProperties> = {
  container: {
    borderWidth: "1px",
    minWidth: "600px",
    padding: "2rem",
    borderRadius: "1.2rem",
    borderColor: "#44403c",
    maxHeight: "600px",
    overflowY: "scroll",
  },
  main: {
    marginBottom: "1rem",
  },
  rightContainer: {
    flexGrow: 1,
  },
  vertical: {
    flexGrow: 1,
    borderWidth: "1px",
    borderRadius: "full",
    borderColor: "#57534e",
  },
  leftContainer: {
    rowGap: ".5rem",
    maxWidth: "20px",
  },
  textarea: {
    overflow: "hidden",
    height: "45px",
    resize: "none",
    outline: "none",
    padding: ".5rem 0",
  },
  addThread: {
    color: "#57534e",
    marginTop: ".5rem",
    textAlign: "left",
  },
};
export default styles;
