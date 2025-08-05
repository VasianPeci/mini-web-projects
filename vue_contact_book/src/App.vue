<template>
    <div class="bg-black text-white pt-3">
        <h1 class="text-center text-success">Contact Book</h1>
        <div class="container">
            <div class="row text-white p-2 mb-2">
                <div class="col-6">
                    <h3>Owner Name: <input type="text" v-model="owner"/></h3>
                </div>
                <div class="col-6">
                    <h3>Max Lucky Number: <input type="text" v-model.number="maxNumber"/></h3>
                </div>
            </div>
            <br/><br/>
            <AddContact :onUpdateContact="onUpdateContact"></AddContact>
            <div class="row">
                <div class="col-12" v-for="contact in contacts" :key="contact.name">
                    <Contact :name="contact.name" :email="contact.email" :phone="contact.phone" :owner="contact.owner" :isFavorite="contact.isFavorite" @update-favorite="contact.isFavorite = onUpdateFavorite($event)"></Contact>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, reactive, provide} from 'vue';
    import ButtonCounter from './Components/ButtonCounter.vue';
    import Contact from './Components/Contact.vue';
    import AddContact from './Components/AddContact.vue';

    const owner = ref("Vasian");
    const maxNumber = ref(100);
    provide("maxNumber", maxNumber);
    const contacts = reactive([
        {
            name: owner,
            phone: "+111 123456789",
            owner,
            email: "vasianpeci@gmail.com",
            isFavorite: true
        },
        {
            name: "Jessica",
            phone: "+333 356789021",
            owner,
            email: "jessicajess@gmail.com",
            isFavorite: false
        },
        {
            name: "Ben",
            phone: "+555 123456789",
            owner,
            email: "ben@gmail.com",
            isFavorite: false
        },
        {
            name: "Hank",
            phone: "+111 648264847",
            owner,
            email: "hank@gmail.com",
            isFavorite: false
        }
    ]);
    const message = "Hello";

    function onUpdateFavorite(isFavoriteFromChildComponent) {
        return !isFavoriteFromChildComponent;
    }

    function onUpdateContact(contact) {
        contact.owner = owner.value;
        contact.isFavorite = false;
        contacts.push(contact);
    }

</script>