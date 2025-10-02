export const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0]; // => "YYYY-MM-DD"
};

export const formatDateLocal = (date) => {
  const d = new Date(date);
  // Décale la date selon le fuseau horaire local
  const offset = d.getTimezoneOffset(); // en minutes
  d.setMinutes(d.getMinutes() - offset);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
};

