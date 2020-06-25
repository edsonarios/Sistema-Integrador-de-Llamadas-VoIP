function getLocalStorageData() {
  const name = localStorage.getItem("NumberSelected");
  console.log("--> Datos en localStorage", !!name ? "OK" : "FAIL");
  return {
    name,
    secret: name,
  };
}

export { getLocalStorageData };
