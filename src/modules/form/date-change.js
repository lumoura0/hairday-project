import { schedulesDay } from "../shedules/load"
// Seleciona o input de data
const selectedData = document.getElementById("date")

// Recarrega a lista de horários quando o input de data mudar.
selectedData.onchange = () => schedulesDay()