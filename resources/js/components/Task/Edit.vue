<template>
    <b-container fluid>
        <b-row class="justify-content-center">
            <b-col cols="8">
                <div class="mb-2">
                    <router-link to="/home" class="btn btn-secondary">Volver</router-link>
                </div>
                <b-card bg-variant="light" header="Editar tarea">
                    <b-form @submit.stop.prevent="updateTask">
                        <b-form-group id="input-group-1" label="Tarea:*" label-for="input-1">
                            <b-form-input id="input-1" v-model="form.name" type="text" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-2" label="Descripción:*" label-for="input-2">
                            <b-textarea cols="3" rows="3" v-model="form.description" required></b-textarea>
                        </b-form-group>
                        <b-row>
                            <b-col cols="6"> <b-form-group id="input-group-3" label="Estado:*" label-for="input-3">
                                    <b-form-select id="input-3" v-model="form.state" :options="status"
                                        required></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group id="input-group-4" label="Fecha vencimiento:" label-for="input-4">
                                    <b-form-input id="input-4" v-model="form.date" type="date"
                                        :min="minDate()"></b-form-input>
                                </b-form-group>
                            </b-col>

                        </b-row>

                        <b-button type="submit" variant="primary">Guardar</b-button>
                        <router-link to="/home" class="btn btn-danger">Cancelar</router-link>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'
export default {
    name: "Add",
    mounted() {
        this.getTaskId();
    },
    data() {
        return {
            form: {
                name: '',
                description: '',
                state: '',
                date: null
            },
            status: ['Pendiente', 'En progreso', 'Completada', 'Cancelada', 'Vencida'],
        }
    },
    methods: {
        minDate() {
            // Obtiene la fecha actual en el formato YYYY-MM-DD
            const today = new Date().toISOString().split('T')[0];
            return today;
        },
        // Obtener tarea por id
        getTaskId: function () {
            let id = this.$route.params.id;
            axios.get('/task-resource/' + id + '/edit').then((response) => {
                this.form.name = response.data.name;
                this.form.description = response.data.description;
                this.form.state = response.data.state;
                this.form.date = response.data.due_date;
            }).catch((error) => {
                console.log(error);
            });
        },
        //Actualizar tarea
        updateTask: function () {
            axios.put('/task-resource/' + this.$route.params.id, this.form).then((response) => {
                Swal.fire({
                    title: "Correcto!",
                    text: "Tarea guardada con éxito!",
                    icon: "success"
                });
                this.$router.push('/home');
            }).catch((error) => {
                console.log(error);
            });
        },
    }
}
</script>
<style scoped>
/* Your component styles here */
</style>
