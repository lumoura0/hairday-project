import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../shedules/load.js"
const form = document.querySelector("form");
const selectedDate = document.getElementById("date");
const clientName = document.getElementById("client");

// Date atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual e define a data mínima
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
    event.preventDefault();

    try {
        const name = clientName.value.trim();

        if (!name) {
            return alert("Informe o nome do cliente!");
        }

        // Recupera o horário selecionado.
        const hourSelected = document.querySelector(".hour-selected");

        if (!hourSelected) {
            return alert("Selecione a hora.");
        }

        // Recupera somente a hora
        const [hour] = hourSelected.innerText.split(":");

        // Insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour");

        // Gera um ID
        const id = new Date().getTime().toString()

        // Faz o agendamento.
        await scheduleNew({
            id,
            name,
            when
        });

        // Recarrega os agendamentos.
        await schedulesDay()

        // Limpa o input de nome do cliente.
        clientName.value = ""
    } catch (error) {
        alert("Não foi possível realizar o agendamento.");
        console.log(error);
    }
};