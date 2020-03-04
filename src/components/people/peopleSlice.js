import { createSlice } from '@reduxjs/toolkit';

const people = createSlice({
    name: "people",
    initialState: {
        data: [
            {
                person_id: 0,
                first_name: "Carlos",
                last_name: "Urena",
                gender: "M"
            }
        ],
        apiResponse: "OK"
    },
    reducers: {
        getAllPeople: (state) => {

        },
        getPerson: (state, action) => {

        },
        createPerson: (state, action) => {
            state.data.push(action.payload);
        },
        deletePerson: (state) => {
            state.data.splice(state.current, 1);
        }
    }
})

export const {
    getAllPeople,
    getPerson,
    createPerson,
    deletePerson
} = people.actions
export default people.reducer
