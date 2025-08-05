<template>
    <div class="container border rounded p-2">
        <div class="text-center tex-white">Add New Contact</div>
        <form @submit.prevent="addContact">
            <div class="row">
                <div class="col-4">
                    <input type="text" class="form-control" placeholder="Name" v-model="contact.name"/>
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" placeholder="Phone Number" v-model="contact.phone"/>
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" placeholder="Email" v-model="contact.email"/>
                </div>
            </div>
            <div class="col-6 offset-3 p-2">
                <button type="submit" class="btn btn-secondary w-100">Add Contact</button>
            </div>
        </form>
    </div>
</template>

<script setup>

import {reactive} from 'vue';

const contact = reactive({
    name: "",
    phone: "",
    email: ""
});

const props = defineProps({onUpdateContact: Function});

function addContact() {
    props.onUpdateContact({
        name: contact.name,
        phone: contact.phone,
        email: contact.email
    });
    contact.name = "";
    contact.email = "";
    contact.phone = "";
}

</script>