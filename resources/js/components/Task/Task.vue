<template>
    <b-container fluid>
        <b-row class="justify-content-center">
            <b-col>
                <b-card header="Lista de Tareas">
                    <div class="d-flex justify-content-end">
                        <router-link to="/add" class="btn btn-success">Crear</router-link>
                    </div>
                    <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
                        <template slot="empty-results">
                            No se encontraron registros!
                        </template>
                        <!--Opciones-->
                        <template slot="options" slot-scope="props">
                            <b-dropdown id="dropdown-1" right text="Ver opciones" variant="secondary" class="m-md-2">
                                <b-dropdown-item @click="detailTask = props.row" v-b-modal.modal-detail><i
                                        class="fa-solid fa-eye"></i> Detalle </b-dropdown-item>
                                <b-dropdown-item
                                    @click="redirectToEdit(props.row.options)"><i
                                        class="fa-solid fa-pen-to-square "></i> Editar</b-dropdown-item>
                                <b-dropdown-item @click="confirmDeleteTask(props.row.options)"><i
                                        class="fa-solid fa-trash"></i> Eliminar</b-dropdown-item>
                            </b-dropdown>
                        </template>
                        <!--Estado tareas-->
                        <template slot="status" slot-scope="props">
                            <b-badge variant="secondary" v-if="props.row.status === 'Pendiente'">Pendiente</b-badge>
                            <b-badge variant="info" v-if="props.row.status === 'En progreso'">En progreso</b-badge>
                            <b-badge variant="success" v-if="props.row.status === 'Completada'">Completada</b-badge>
                            <b-badge variant="danger" v-if="props.row.status === 'Cancelada'">Cancelada</b-badge>
                            <b-badge variant="warning" v-if="props.row.status === 'Vencida'">Vencida</b-badge>
                        </template>
                        <!--Check tareas-->
                        <template slot="completed" slot-scope="props">
                            <b-form-checkbox v-if="props.row.status === 'Completada'"
                                @change="confirmCloseTask(props.row.options)" v-model="checkboxes[props.row.vbt_id - 1]"
                                disabled></b-form-checkbox>
                            <b-form-checkbox v-else @change="confirmCloseTask(props.row.options)"
                                v-model="checkboxes[props.row.vbt_id - 1]"></b-form-checkbox>
                        </template>
                    </vue-bootstrap4-table>
                </b-card>
            </b-col>
            <!--Modal detalle-->
            <div>
                <b-modal id="modal-detail" title="Detalle Tarea" ok-only>
                    <p><b>Nombre:</b> {{ detailTask.name }}</p>
                    <p><b>Descripción:</b> {{ detailTask.desc_completed }}</p>
                    <p><b>Estado:</b> <b-badge variant="secondary"
                            v-if="detailTask.status === 'Pendiente'">Pendiente</b-badge>
                        <b-badge variant="info" v-if="detailTask.status === 'En progreso'">En progreso</b-badge>
                        <b-badge variant="success" v-if="detailTask.status === 'Completada'">Completada</b-badge>
                        <b-badge variant="danger" v-if="detailTask.status === 'Cancelada'">Cancelada</b-badge>
                        <b-badge variant="warning" v-if="detailTask.status === 'Vencida'">Vencida</b-badge>
                    </p>
                    <p><b>Fecha creación:</b> {{ detailTask.created_at }}</p>
                    <p><b>Fecha finalización:</b> {{ detailTask.due_date }}</p>
                </b-modal>
            </div>
        </b-row>
    </b-container>
</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table'
import axios from 'axios'
export default {
    name: "User",
    components: { VueBootstrap4Table },
    mounted() {
        this.getTasks();
    },
    data() {
        return {
            config: {
                checkbox_rows: false,
                rows_selectable: true,
                card_mode: false,
                highlight_row_hover: false,
                multi_column_sort: false,
                global_search: {
                    placeholder: "Buscar..",
                    visibility: true,
                    case_sensitive: false
                },
                show_refresh_button: false,
                show_reset_button: false,
                preservePageOnDataChange: false,
                per_page: 10,
            },

            columns: [
                {
                    label: "#",
                    name: "cont",
                },
                {
                    label: "Nombre",
                    name: "name",
                },
                {
                    label: "Descripción",
                    name: "description",
                },
                {
                    label: "Estado",
                    name: "status",
                    filter: {
                        type: "select",
                        placeholder: "Filtrar",
                        mode: "multi",
                        options: [
                            {
                                "name": "Pendiente",
                                "value": "Pendiente"
                            },
                            {
                                "name": "En progreso",
                                "value": "En progreso"
                            },
                            {
                                "name": "Completada",
                                "value": "Completada"
                            },
                            {
                                "name": "Cancelada",
                                "value": "Cancelada"
                            },
                            {
                                "name": "Vencida",
                                "value": "Vencida"
                            },
                        ]
                    },
                },
                {
                    label: "Tarea completada",
                    name: "completed",
                },
                {
                    label: "Fecha de creación",
                    name: "created_at",
                },
                {
                    label: "Fecha de vencimiento",
                    name: "due_date",
                },
                {
                    label: "Opciones",
                    name: "options",
                }
            ],
            rows: [],
            checkboxes: [],
            detailTask: [],
        }
    },
    methods: {
        //Lista tareas
        getTasks: function () {
            axios.get('/task-resource')
                .then(response => {
                    this.rows = [];
                    let count = 1;
                    let checkboxes_aux = [];
                    for (let i in response.data) {
                        let dueDate = response.data[i].due_date ? response.data[i].due_date.substr(0, 10) : "Sin fecha";
                        let truncatedDescription = response.data[i].description.length > 60 ? response.data[i].description.substr(0, 80) + '...' : response.data[i].description;

                        this.rows.push({
                            "cont": count++,
                            "name": response.data[i].name,
                            "description": truncatedDescription,
                            "desc_completed": response.data[i].description,
                            "status": response.data[i].state,
                            "due_date": dueDate,
                            "created_at": response.data[i].created_at.substr(0, 10),
                            "options": response.data[i].id
                        });
                        checkboxes_aux.push(response.data[i].state === 'Completada' ? true : false)
                    }
                    this.checkboxes = checkboxes_aux;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        //Confirmar cerrar tarea
        confirmCloseTask: function (id) {
            Swal.fire({
                icon: "warning",
                title: `¿Desea marcar la tarea como completada?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.stateTask(id);
                } else if (result.isDenied) {
                    this.getTasks()
                }
            });
        },
        //Actualizar estado tarea
        stateTask: function (id) {
            let formData = {
                id: id
            };
            axios.post('/updateStateTask', formData).then((response) => {
                Swal.fire({
                    title: "Correcto!",
                    text: "Tarea completada con éxito!",
                    icon: "success"
                });
                this.getTasks()
            }).catch((error) => {
                console.log(error);
            });
        },
        //Confirmar eliminar tarea
        confirmDeleteTask: function (id) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertirlo!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, bórrala!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteTask(id)
                }
            })
        },
        //Eliminar tarea
        deleteTask: function (id) {
            axios.delete('/task-resource/' + id).then((response) => {
                Swal.fire({
                    title: "Correcto!",
                    text: "Tarea eliminada con éxito!",
                    icon: "success"
                });
                this.getTasks()
            }).catch((error) => {
                console.log(error);
            });
        },
        redirectToEdit(id) {
            // Utiliza vue-router para redireccionar a la ruta 'edit' con el ID como parámetro
            this.$router.push({ name: 'edit', params: { id } });
        }
    }
}
</script>
<style scoped>/* Your component styles here */</style>
