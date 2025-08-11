<script lang="ts">
    let newTask = $state("");
    let {addTask, }: {
        addTask: (newTask: string) => void;
    } = $props();

    function onsubmit(e: SubmitEvent) {
        e.preventDefault();
        addTask(newTask);
        newTask = "";
    }

</script>

<form {onsubmit}>
    <div>
        <input name="newTask" placeholder="New Task" bind:value={newTask}>
    </div>
    <button>Add Task</button>
</form>

<style>
    form {
        margin-bottom: 1rem;
    }

    input {
        width: 500px;
        height: 30px;
        border-radius: 5px;
        font-size: 1.5rem;
        border: 2px solid rgb(66, 152, 213);
        padding: 5px;
    }

    form div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 45px;
    }

    button {
        display: block;
        margin: 0 auto;
        margin-top: 25px;
        font-size: 1.5rem;
        cursor: pointer;
        width: 10rem;
        border-radius: 10%;
        background: linear-gradient(-45deg, rgb(71, 71, 198), blue);
        color: rgb(254, 208, 91);
        transition: background ease-in-out 1000;
    }

    button:hover {
        background: linear-gradient(45deg, rgb(71, 71, 198), blue);
    }
</style>