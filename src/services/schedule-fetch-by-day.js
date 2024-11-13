import dayjs from 'dayjs'
import { apiConfig } from './api-config'
export async function scheduleFetchByDay({ date }) {
    try {
        // Faz a requisição para enviar os dados do agendamentos.
        const response = await fetch(`${apiConfig.baseURL}/schedules`)

        const data = await response.json();

        // Filta os agendamentos pelo dia selecionado.
        const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"))

        return dailySchedules
    } catch (error) {
        console.log(error);
        alert("Não foi possível buscar os agendamentos do dia selecionado")
    }
}