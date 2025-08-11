<script lang="ts">
  import { fade } from "svelte/transition";
    import type {Task} from "../types";

    let {tasks, toggleDone, removeTask}: {
        tasks: Task[],
        toggleDone: (task: Task) => void,
        removeTask: (id: string) => void,
    } = $props();
</script>

<section>
    {#each tasks as task}
      <article transition:fade>
        <div>
          <input type="checkbox" checked={task.done} onchange={() => toggleDone(task)}>
          <span class:done={task.done}>{task.title}</span>
        </div>
        <button onclick={() => removeTask(task.id)}>Remove</button>
      </article>
    {/each}
</section>

<style>

  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 500px;
    height: 40px;
    border-radius: 5%;
    font-size: 1.2rem;
    border: 2px solid rgb(66, 152, 213);
    margin-bottom: 15px;
    padding: 3px 10px;
  }

  article input {
    margin-right: 10px;
    cursor: pointer;
  }

  .done {
    text-decoration: line-through;
  }

  button {
    background: none;
    border: rgb(65, 91, 239);
    color: rgb(65, 91, 239);
    font-size: 1rem;
  }

  button:hover {
    transform: scale(1.1);
    color: white;
    background-color: rgb(65, 91, 239);
    cursor: pointer;
    border: 1px solid black;
  }
</style>