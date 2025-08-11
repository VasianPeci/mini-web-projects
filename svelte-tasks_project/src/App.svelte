<script lang="ts">
  import TasksForm from "./components/tasks-form.svelte";
  import TasksList from "./components/tasks-list.svelte";
  import type {Task, Filter} from "./types";

  let tasks = $state<Task[]>([]);
  let message = 'Tasks App';
  let totalDone = $derived(tasks.reduce((acc, task) => task.done ? acc + 1 : acc, 0));
  let currentFilter = $state<Filter>("All");
  let filteredTasks = $derived.by(() => {
    switch (currentFilter) {
      case "All": {
        return tasks;
      }
      case "Done": {
        return tasks.filter(task => task.done);
      }
      case "Todo": {
        return tasks.filter(task => !task.done);
      }
    }
  });

  function addTask(newTask: string) {
    tasks.push({
      id: crypto.randomUUID(),
      title: newTask,
      done: false
    });
  }
  
  function toggleDone(task: Task) {
    task.done = !task.done;
  }

  function removeTask(id: string) {
    tasks = tasks.filter((task) => task.id !== id);
  }

</script>

{#snippet filterButton(filter: Filter)}
  <button class:contrast={currentFilter === filter} onclick={() => currentFilter = filter} class="secondary">{filter}</button>
{/snippet}

<main>
  <h1>{message}</h1>
  <TasksForm {addTask}></TasksForm>
  <p class:done={totalDone === tasks.length && totalDone !== 0}>
    {#if tasks.length}
      {totalDone} / {tasks.length} Tasks Done 
      {#if totalDone === tasks.length}
      !
      {/if}
    {:else}
      Add a task to get started.
    {/if}
  </p>
  {#if tasks.length}
    <div class="button-container">
      {@render filterButton("All")}
      {@render filterButton("Todo")}
      {@render filterButton("Done")}
    </div>
  {/if}
  <TasksList tasks={filteredTasks} {toggleDone} {removeTask}></TasksList>
</main>

<style>
  :global(body) {
    background-color: rgb(9, 12, 34);
    color: white;
  }

  main {
    margin: 1rem auto;
    max-width: 800px;
  }

  h1, p {
    text-align: center;
  }

  p {
    margin-top: 40px;
    font-size: 20px;
  }

  .done {
    color: green;
  }

  .button-container {
    width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: end;
    gap: 0.5;
    margin-top: 50px;
    margin-bottom: 1rem;
  }

  .secondary {
    margin-left: 5px;
    cursor: pointer;
    font-size: 1rem;
    color: white;
    background-color: rgb(142, 142, 142);
    padding: 12px;
    border-radius: 5px;
  }

  .secondary:hover {
    color: rgb(142, 142, 142);
    background-color: white;
  }

  .contrast {
    color: black;
    background-color: white;
  }

</style>