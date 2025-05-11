// src/utils/dateFormatter.js
export const formatDeadline = (isoString) => {
  if (!isoString) return "Sem data definida";

  try {
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return "Data inválida";

    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "Data inválida";
  }
};
