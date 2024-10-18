import axios from "axios";

export const fetchTeams = async () => {
    const { data } = await axios.get("data.json");
    return data;
};