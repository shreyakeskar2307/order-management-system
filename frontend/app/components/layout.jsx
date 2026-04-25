export default function Layout({ title, children }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 30,
  },
  card: {
    width: "100%",
    maxWidth: 900,
    background: "white",
    borderRadius: 12,
    padding: 25,
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: 20,
    fontSize: 26,
  },
};